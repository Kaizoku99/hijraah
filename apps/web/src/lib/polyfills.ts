// Polyfill for Supabase SSR fetch issues and Web Streams API
// This addresses the "body.tee is not a function" and "pipeThrough is not a function" errors

// Use fetch-ponyfill which is already being used in the codebase
// IMPORTANT: Only patch in Node.js runtime. Do NOT patch in Edge/middleware runtime,
// as overriding Request/Response there can break NextRequest internals.
if (
  typeof globalThis !== 'undefined' &&
  typeof window === 'undefined' &&
  // Next.js sets NEXT_RUNTIME to 'nodejs' for Node runtime and 'edge' for middleware/edge
  (typeof process !== 'undefined' && process.env && process.env.NEXT_RUNTIME === 'nodejs')
) {
  try {
    // Use fetch-ponyfill for Node.js server-side environment only
    const fetchPonyfill = require('fetch-ponyfill');
    const { fetch } = fetchPonyfill();

    // Only override fetch in Node.js; keep native Request/Response/Headers
    globalThis.fetch = fetch;

    console.log('[Supabase] Server fetch patched to use ponyfill ✅');
  } catch (error) {
    console.warn('fetch-ponyfill not available:', error);
  }

  // Context7 - Enhanced AI SDK v5 Web Streams Polyfill Pattern
  try {
    // Check if Web Streams API needs polyfilling more thoroughly
    const needsPolyfill = 
      typeof globalThis.ReadableStream === 'undefined' ||
      typeof globalThis.WritableStream === 'undefined' ||
      typeof globalThis.TransformStream === 'undefined' ||
      !globalThis.ReadableStream?.prototype?.pipeThrough;

    if (needsPolyfill) {
      // Latest Node.js pattern: Use built-in node:stream/web for Node.js 18+
      try {
        const { ReadableStream, WritableStream, TransformStream } = require('node:stream/web');
        
        // Polyfill with Node.js native streams
        globalThis.ReadableStream = ReadableStream;
        globalThis.WritableStream = WritableStream;
        globalThis.TransformStream = TransformStream;

        console.log('[AI SDK v5] Web Streams API polyfilled with Node.js native streams ✅');
      } catch (nodeError) {
        console.warn('[AI SDK v5] Node.js native streams not available, trying web-streams-polyfill:', nodeError);
        
        // Fallback to web-streams-polyfill for older Node.js versions
        try {
          const webStreamsPolyfill = require('web-streams-polyfill');
          globalThis.ReadableStream = webStreamsPolyfill.ReadableStream;
          globalThis.WritableStream = webStreamsPolyfill.WritableStream;
          globalThis.TransformStream = webStreamsPolyfill.TransformStream;
          
          console.log('[AI SDK v5] Web Streams API polyfilled with web-streams-polyfill ✅');
        } catch (polyfillError) {
          console.warn('[AI SDK v5] web-streams-polyfill not available:', polyfillError);
          
          // Final fallback: Create minimal polyfill for critical methods
          if (typeof globalThis.ReadableStream !== 'undefined' && !globalThis.ReadableStream.prototype.pipeThrough) {
            globalThis.ReadableStream.prototype.pipeThrough = function(transform, options) {
              console.warn('[AI SDK v5] Using minimal pipeThrough polyfill');
              // Basic implementation - may not work in all cases but prevents crashes
              return transform.readable;
            };
            console.log('[AI SDK v5] Minimal pipeThrough polyfill applied ✅');
          }
        }
      }
    } else {
      console.log('[AI SDK v5] Web Streams API already available ✅');
    }
  } catch (error) {
    console.warn('[AI SDK v5] Web Streams polyfill completely failed:', error);
    
    // Last resort: Log clear error message for debugging
    console.error('[AI SDK v5] ⚠️  Web Streams API unavailable. This may cause streaming errors.');
    console.error('[AI SDK v5] ⚠️  Please ensure Node.js 18+ or install web-streams-polyfill');
  }
}

export {};