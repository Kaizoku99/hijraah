import { NextRequest } from 'next/server';
import api from '@/api/hono/routes';

// Map all Next.js API routes to the Hono API
export async function GET(request: NextRequest, { params }: { params: { route: string[] } }) {
  return api.fetch(request, {
    path: `/${params.route.join('/')}`,
  });
}

export async function POST(request: NextRequest, { params }: { params: { route: string[] } }) {
  return api.fetch(request, {
    path: `/${params.route.join('/')}`,
  });
}

export async function PUT(request: NextRequest, { params }: { params: { route: string[] } }) {
  return api.fetch(request, {
    path: `/${params.route.join('/')}`,
  });
}

export async function DELETE(request: NextRequest, { params }: { params: { route: string[] } }) {
  return api.fetch(request, {
    path: `/${params.route.join('/')}`,
  });
}

export async function PATCH(request: NextRequest, { params }: { params: { route: string[] } }) {
  return api.fetch(request, {
    path: `/${params.route.join('/')}`,
  });
}

export async function HEAD(request: NextRequest, { params }: { params: { route: string[] } }) {
  return api.fetch(request, {
    path: `/${params.route.join('/')}`,
  });
}

export async function OPTIONS(request: NextRequest, { params }: { params: { route: string[] } }) {
  return api.fetch(request, {
    path: `/${params.route.join('/')}`,
  });
} 