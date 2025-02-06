import { supabaseClient } from '@/lib/supabase/client';
import { Case, CaseTimeline, CaseType, CaseEventType } from '@/types/cases';
import { Database } from '@/types/database';

type Tables = Database['public']['Tables'];
type CaseRow = Tables['cases']['Row'];
type CaseInsert = Tables['cases']['Insert'];
type CaseUpdate = Tables['cases']['Update'];
type TimelineInsert = Tables['case_timeline']['Insert'];

export class CaseService {
  private supabase = supabaseClient;

  async getCase(id: string, userId: string): Promise<Case | null> {
    const { data, error } = await this.supabase
      .from('cases')
      .select('*, documents(*), timeline(*)')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      case_type: (data.metadata as { case_type?: CaseType })?.case_type || 'other',
      destination_country: (data.metadata as { destination_country?: string })?.destination_country || '',
      documents: (data.documents || []).map(doc => ({
        id: doc.id,
        case_id: doc.case_id || '',
        document_id: doc.id,
        name: doc.name,
        category: (doc.metadata as { category?: string })?.category || 'other',
        status: 'pending',
        metadata: doc.metadata,
        created_at: doc.created_at,
        updated_at: doc.updated_at
      })),
      timeline: data.timeline || []
    } as Case;
  }

  async getCases(userId: string): Promise<Case[]> {
    const { data, error } = await this.supabase
      .from('cases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Case[];
  }

  async getCasesByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Case[]> {
    const { data, error } = await this.supabase
      .from('cases')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Case[];
  }

  async createCase(caseData: Partial<CaseInsert>): Promise<Case> {
    const { data, error } = await this.supabase
      .from('cases')
      .insert({
        ...caseData,
        status: 'active',
        current_stage: 'document_collection',
      } as CaseInsert)
      .select()
      .single();

    if (error) throw error;

    // Create initial timeline event
    await this.createTimelineEvent(data.id, {
      event_type: 'created' as CaseEventType,
      description: 'Case created',
    });

    return data as Case;
  }

  async updateCase(
    id: string,
    userId: string,
    updates: Partial<CaseUpdate>
  ): Promise<Case> {
    const { data, error } = await this.supabase
      .from('cases')
      .update(updates as CaseUpdate)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    // Create timeline event for status or stage change
    if (updates.status || updates.current_stage) {
      await this.createTimelineEvent(id, {
        event_type: updates.status ? 'status_change' : 'stage_change' as CaseEventType,
        description: updates.status
          ? `Status changed to ${updates.status}`
          : `Stage changed to ${updates.current_stage}`,
      });
    }

    return data as Case;
  }

  async deleteCase(id: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('cases')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }

  private async createTimelineEvent(
    caseId: string,
    event: Partial<TimelineInsert>
  ): Promise<void> {
    const { error } = await this.supabase
      .from('case_timeline')
      .insert({
        case_id: caseId,
        ...event,
      } as TimelineInsert);

    if (error) throw error;
  }
}

export const caseService = new CaseService(); 