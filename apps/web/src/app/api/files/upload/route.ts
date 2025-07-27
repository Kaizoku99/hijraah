import { createClient } from "@supabase/supabase-js";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";


// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// File validation schema using Zod
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size exceeds 10MB limit",
    })
    .refine(
      (file) => {
        const ALLOWED_FILE_TYPES = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "application/pdf",
          "text/plain",
          "text/csv",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return ALLOWED_FILE_TYPES.includes(file.type);
      },
      {
        message: "File type not allowed",
      }
    ),
  chatId: z.string().min(1, { message: "Chat ID is required" }),
  messageId: z.string().nullable().optional(),
});

// Set response runtime to edge for better performance
// export const runtime = 'edge'; // Commented out or removed

export async function POST(request: Request) {
  try {
    // Get user from session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    if (request.body === null) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const chatId = formData.get("chatId") as string;
    const messageId = (formData.get("messageId") as string) || null;

    // Validate file using Zod schema
    const validationResult = FileSchema.safeParse({
      file,
      chatId,
      messageId,
    });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map((error) => error.message)
        .join(", ");
      console.error(
        "Zod validation failed:",
        JSON.stringify(validationResult.error.flatten(), null, 2)
      );
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Check if chat exists and belongs to user
    const { data: chat, error: chatError } = await supabase
      .from("chats")
      .select("id")
      .eq("id", chatId)
      .eq("user_id", userId)
      .single();

    if (chatError || !chat) {
      return NextResponse.json(
        { error: "Chat not found or access denied" },
        { status: 404 }
      );
    }

    // Generate a unique filename
    const fileId = nanoid();
    const fileExtension = file.name.split(".").pop() || "";
    const uniqueFilename = `${fileId}-${Date.now()}.${fileExtension}`;
    const filePath = `chats/${chatId}/${uniqueFilename}`;

    // Upload file to blob storage
    const fileBuffer = await file.arrayBuffer();
    const { url } = await put(filePath, fileBuffer, {
      access: "public",
      contentType: file.type,
    });

    // Store file metadata in database
    const { data: attachment, error: attachmentError } = await supabase
      .from("chat_attachments")
      .insert({
        id: fileId,
        chat_id: chatId,
        message_id: messageId,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_path: url,
      })
      .select()
      .single();

    if (attachmentError) {
      console.error("Error storing attachment metadata:", attachmentError);
      return NextResponse.json(
        { error: "Failed to store attachment metadata" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      url,
    });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return NextResponse.json(
      { error: "Failed to process file upload" },
      { status: 500 }
    );
  }
}
