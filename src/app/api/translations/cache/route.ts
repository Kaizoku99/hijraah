import { NextRequest } from 'next/server';
import { translationCache } from '@/lib/redis';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    if (locale) {
      await translationCache.invalidate(locale);
      return Response.json({ success: true, message: `Cache invalidated for locale: ${locale}` });
    } else {
      await translationCache.invalidateAll();
      return Response.json({ success: true, message: 'All translation caches invalidated' });
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return Response.json(
      { success: false, message: 'Failed to invalidate cache' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    if (!locale) {
      return Response.json(
        { success: false, message: 'Locale parameter is required' },
        { status: 400 }
      );
    }

    const translations = await translationCache.get(locale);
    return Response.json({
      success: true,
      locale,
      hasCache: !!translations,
      translations
    });
  } catch (error) {
    console.error('Cache check error:', error);
    return Response.json(
      { success: false, message: 'Failed to check cache' },
      { status: 500 }
    );
  }
} 