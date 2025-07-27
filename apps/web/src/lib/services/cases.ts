import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

export type Case = Database['public']['Tables']['cases']['Row']
export type CaseInsert = Database['public']['Tables']['cases']['Insert']
export type CaseUpdate = Database['public']['Tables']['cases']['Update']

export const casesService = {
  async getCases() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getCaseById(id: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async createCase(caseData: CaseInsert) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('cases')
      .insert(caseData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateCase(id: string, caseData: CaseUpdate) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('cases')
      .update(caseData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteCase(id: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getCaseAnalytics() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('cases')
      .select('status, type')
    
    if (error) throw error

    const analytics = {
      total: data.length,
      byStatus: data.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      byType: data.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }

    return analytics
  }
} 

// Export aliases for backward compatibility
export const caseService = casesService;
export const CaseService = casesService; 