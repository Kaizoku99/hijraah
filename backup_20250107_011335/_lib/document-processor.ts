import { PDFDocument } from 'pdf-lib';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';
import pdf from 'pdf-parse';

interface ProcessedDocument {
  text: string;
  metadata?: {
    pageCount?: number;
    author?: string;
    creationDate?: Date;
  };
  images?: string[];
}

export async function processDocument(fileUrl: string): Promise<ProcessedDocument> {
  try {
    const response = await fetch(fileUrl);
    const buffer = await response.arrayBuffer();

    if (fileUrl.endsWith('.pdf')) {
      // Convert ArrayBuffer to Buffer for PDF processing
      const nodeBuffer = Buffer.from(buffer);
      
      // Process PDF
      const [pdfText, pdfDoc] = await Promise.all([
        pdf(nodeBuffer),
        PDFDocument.load(nodeBuffer)
      ]);

      const metadata = {
        pageCount: pdfDoc.getPageCount(),
        author: pdfDoc.getAuthor(),
        creationDate: pdfDoc.getCreationDate(),
      };

      // Extract images from PDF
      const images: string[] = [];
      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();
        
        // Convert page to image
        const pngBytes = await page.png();
        const imageBuffer = Buffer.from(pngBytes);
        
        // Process image with sharp
        const processedImage = await sharp(imageBuffer)
          .resize(800, null, { fit: 'inside' })
          .toBuffer();
        
        // Perform OCR on the image
        const worker = await createWorker('eng');
        const { data: { text: imageText } } = await worker.recognize(processedImage);
        await worker.terminate();

        if (imageText.trim()) {
          images.push(imageText);
        }
      }

      return {
        text: pdfText.text,
        metadata,
        images,
      };

    } else if (fileUrl.endsWith('.txt')) {
      const text = new TextDecoder().decode(buffer);
      return { text };

    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl)) {
      // Process images
      const imageBuffer = Buffer.from(buffer);
      const processedImage = await sharp(imageBuffer)
        .resize(800, null, { fit: 'inside' })
        .toBuffer();

      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(processedImage);
      await worker.terminate();

      return {
        text,
        images: [text],
      };

    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}