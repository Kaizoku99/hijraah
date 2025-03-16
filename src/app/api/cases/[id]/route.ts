import { NextRequest, NextResponse } from 'next/server';
import { casesService } from '@/lib/services/cases';
import { auth } from '@/lib/auth';

// GET /api/cases/[id] - Get a specific case
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the user from the session for authorization
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the case by ID
    const caseData = await casesService.getCaseById(params.id);
    
    // Check if the case exists
    if (!caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }
    
    // Check if the user has access to this case
    if (caseData.user_id !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(caseData);
  } catch (error) {
    console.error('Error fetching case:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case' },
      { status: 500 }
    );
  }
}

// PUT /api/cases/[id] - Update a specific case
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Get the user from the session for authorization
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the case to check permissions
    const existingCase = await casesService.getCaseById(params.id);
    
    // Check if the case exists
    if (!existingCase) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }
    
    // Check if the user has access to this case
    if (existingCase.user_id !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Update the case
    const updatedCase = await casesService.updateCase(params.id, body);
    
    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error('Error updating case:', error);
    return NextResponse.json(
      { error: 'Failed to update case' },
      { status: 500 }
    );
  }
}

// DELETE /api/cases/[id] - Delete a specific case
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the user from the session for authorization
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the case to check permissions
    const existingCase = await casesService.getCaseById(params.id);
    
    // Check if the case exists
    if (!existingCase) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }
    
    // Check if the user has access to this case
    if (existingCase.user_id !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Delete the case
    await casesService.deleteCase(params.id);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting case:', error);
    return NextResponse.json(
      { error: 'Failed to delete case' },
      { status: 500 }
    );
  }
} 