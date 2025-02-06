import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.1'
import { ValidationResult, QueryAnalysis, ImmigrationUpdate, UserProfile } from './types.ts'

// Initialize Supabase client
export const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
)

// Rate limiting utilities with sliding window
export const getRateLimit = async (userId: string): Promise<{ allowed: boolean }> => {
  const kv = await Deno.openKv()
  const now = Date.now()
  const windowSize = 60000 // 1 minute window
  const maxRequests = 100 // 100 requests per minute
  
  // Use a sliding window for more accurate rate limiting
  const key = ['rate_limit', userId]
  const result = await kv.get(key)
  const requests = (result.value as { timestamp: number; count: number }[]) || []
  
  // Remove expired requests
  const validRequests = requests.filter(r => now - r.timestamp < windowSize)
  
  // Count total requests in the current window
  const totalRequests = validRequests.reduce((sum, r) => sum + r.count, 0)
  
  if (totalRequests >= maxRequests) {
    return { allowed: false }
  }
  
  // Add new request
  validRequests.push({ timestamp: now, count: 1 })
  await kv.set(key, validRequests, { expireIn: windowSize })
  
  return { allowed: true }
}

// Queue management with priority and timeout
export const addToQueue = async (userId: string): Promise<number> => {
  const kv = await Deno.openKv()
  const queueKey = ['chat_queue']
  const userStateKey = ['user_state', userId]
  const now = Date.now()
  
  // Get current queue and user state
  const [queueResult, userStateResult] = await Promise.all([
    kv.get(queueKey),
    kv.get(userStateKey)
  ])
  
  const queue = (queueResult.value as Array<{
    userId: string;
    priority: number;
    timestamp: number;
  }>) || []
  
  const userState = userStateResult.value as {
    lastAccess: number;
    totalRequests: number;
  } | null
  
  // Calculate user priority based on usage patterns
  const priority = userState ? 
    Math.floor(userState.totalRequests / 100) : 0
  
  // Remove expired entries (older than 5 minutes)
  const activeQueue = queue.filter(entry => now - entry.timestamp < 300000)
  
  // Check if user is already in queue
  const existingPosition = activeQueue.findIndex(entry => entry.userId === userId)
  if (existingPosition >= 0) {
    return existingPosition
  }
  
  // Add user to queue with priority
  const newEntry = {
    userId,
    priority,
    timestamp: now
  }
  
  // Insert maintaining priority order
  const insertIndex = activeQueue.findIndex(entry => entry.priority < priority)
  if (insertIndex >= 0) {
    activeQueue.splice(insertIndex, 0, newEntry)
  } else {
    activeQueue.push(newEntry)
  }
  
  // Update queue and user state
  await Promise.all([
    kv.set(queueKey, activeQueue),
    kv.set(userStateKey, {
      lastAccess: now,
      totalRequests: (userState?.totalRequests || 0) + 1
    })
  ])
  
  return activeQueue.findIndex(entry => entry.userId === userId)
}

// Enhanced document validation with metadata extraction
export const validateDocument = (file: {
  fileType: string,
  fileSize: number,
  fileName: string
}): ValidationResult => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
  const MAX_FILENAME_LENGTH = 255
  const RESTRICTED_CHARS = /[<>:"/\\|?*]/g
  const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png']
  
  // Size validation
  if (file.fileSize > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size exceeds limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    }
  }
  
  // Type validation
  if (!ALLOWED_TYPES.includes(file.fileType)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}` 
    }
  }
  
  // Filename validation
  if (file.fileName.length > MAX_FILENAME_LENGTH) {
    return { 
      valid: false, 
      error: 'Filename is too long' 
    }
  }
  
  if (RESTRICTED_CHARS.test(file.fileName)) {
    return { 
      valid: false, 
      error: 'Filename contains invalid characters' 
    }
  }
  
  const extension = '.' + file.fileName.split('.').pop()?.toLowerCase()
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return { 
      valid: false, 
      error: `Invalid file extension. Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}` 
    }
  }
  
  return { valid: true }
}

// Enhanced query analysis with NLP-like patterns
export const analyzeQuery = (query: string): QueryAnalysis => {
  const lowerQuery = query.toLowerCase()
  
  // Legal expertise patterns
  const legalPatterns = [
    'legal', 'law', 'regulation', 'compliance', 'statute',
    'visa', 'permit', 'immigration', 'policy', 'requirement'
  ]
  
  // Document patterns
  const documentPatterns = [
    'document', 'file', 'form', 'certificate', 'passport',
    'id', 'identification', 'proof', 'evidence', 'upload'
  ]
  
  // Complexity indicators
  const complexityIndicators = {
    high: ['compare', 'difference', 'eligibility', 'requirements', 'process'],
    medium: ['how', 'what', 'when', 'where', 'which'],
    low: ['is', 'can', 'will', 'do', 'does']
  }
  
  // Calculate scores
  const legalScore = legalPatterns.reduce(
    (score, pattern) => score + (lowerQuery.includes(pattern) ? 1 : 0),
    0
  )
  
  const documentScore = documentPatterns.reduce(
    (score, pattern) => score + (lowerQuery.includes(pattern) ? 1 : 0),
    0
  )
  
  const complexityScore = {
    high: complexityIndicators.high.reduce(
      (score, word) => score + (lowerQuery.includes(word) ? 2 : 0),
      0
    ),
    medium: complexityIndicators.medium.reduce(
      (score, word) => score + (lowerQuery.includes(word) ? 1 : 0),
      0
    ),
    low: complexityIndicators.low.reduce(
      (score, word) => score + (lowerQuery.includes(word) ? 0.5 : 0),
      0
    )
  }
  
  // Determine complexity level
  let complexity: 'low' | 'medium' | 'high' = 'low'
  const totalComplexity = complexityScore.high + complexityScore.medium + complexityScore.low
  
  if (totalComplexity >= 4) {
    complexity = 'high'
  } else if (totalComplexity >= 2) {
    complexity = 'medium'
  }
  
  return {
    requiresLegalExpertise: legalScore >= 2,
    isDocumentRelated: documentScore >= 2,
    complexity
  }
}

// Enhanced webhook signature validation with timing-safe comparison
export const validateWebhookSignature = async (req: Request): Promise<boolean> => {
  const signature = req.headers.get('x-webhook-signature')
  const secret = Deno.env.get('WEBHOOK_SECRET')
  const timestamp = req.headers.get('x-webhook-timestamp')
  
  if (!signature || !secret || !timestamp) {
    return false
  }
  
  // Check timestamp freshness (within 5 minutes)
  const timestampMs = parseInt(timestamp)
  if (isNaN(timestampMs) || Date.now() - timestampMs > 300000) {
    return false
  }
  
  // Timing-safe string comparison
  const compare = (a: string, b: string): boolean => {
    if (a.length !== b.length) return false
    let result = 0
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i)
    }
    return result === 0
  }
  
  // Generate expected signature
  const payload = req.headers.get('content-type')?.includes('application/json') 
    ? JSON.stringify(req.body) 
    : ''
  
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(payload + timestamp + secret)
  )
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return compare(signature, expectedSignature)
}

// Enhanced immigration update processing with validation and enrichment
export const processImmigrationUpdate = (update: ImmigrationUpdate): ImmigrationUpdate => {
  // Normalize and validate visa types
  const normalizedVisaTypes = update.affectedVisaTypes.map(type => {
    const normalized = type.toUpperCase().trim()
    if (!/^[A-Z0-9\-]+$/.test(normalized)) {
      throw new Error(`Invalid visa type format: ${type}`)
    }
    return normalized
  })
  
  // Validate and format dates
  const effectiveDate = update.effectiveDate 
    ? new Date(update.effectiveDate) 
    : new Date()
  
  if (isNaN(effectiveDate.getTime())) {
    throw new Error('Invalid effective date')
  }
  
  // Validate country code
  const countryCode = update.country.toUpperCase().trim()
  if (!/^[A-Z]{2,3}$/.test(countryCode)) {
    throw new Error('Invalid country code format')
  }
  
  // Enrich update with additional metadata
  return {
    ...update,
    id: update.id || crypto.randomUUID(),
    type: update.type.toLowerCase(),
    content: update.content.trim(),
    affectedVisaTypes: normalizedVisaTypes,
    effectiveDate: effectiveDate.toISOString(),
    country: countryCode
  }
}

// Enhanced affected users search with advanced filtering
export const findAffectedUsers = async (update: ImmigrationUpdate): Promise<UserProfile[]> => {
  // Query users with current or intended visa types
  const { data: directlyAffected } = await supabase
    .from('profiles')
    .select('*')
    .or(`currentVisaType.in.(${update.affectedVisaTypes.join(',')}),` +
        `intendedVisaType.in.(${update.affectedVisaTypes.join(',')})`)
    .eq('country', update.country)
  
  // Query users in related visa categories
  const relatedVisaTypes = update.affectedVisaTypes.flatMap(type => {
    const [category] = type.split('-')
    return [`${category}-A`, `${category}-B`, `${category}-C`]
  })
  
  const { data: indirectlyAffected } = await supabase
    .from('profiles')
    .select('*')
    .or(`currentVisaType.in.(${relatedVisaTypes.join(',')}),` +
        `intendedVisaType.in.(${relatedVisaTypes.join(',')})`)
    .eq('country', update.country)
  
  // Combine and deduplicate results
  const allAffected = [...(directlyAffected || []), ...(indirectlyAffected || [])]
  const uniqueUsers = Array.from(
    new Map(allAffected.map(user => [user.id, user])).values()
  )
  
  return uniqueUsers as UserProfile[]
}

// Enhanced user notification with prioritization and batching
export const notifyUsers = async (users: UserProfile[], update: ImmigrationUpdate): Promise<boolean> => {
  // Prioritize users based on visa type match
  const prioritizedUsers = users.sort((a, b) => {
    const aDirectMatch = update.affectedVisaTypes.includes(a.currentVisaType || '')
    const bDirectMatch = update.affectedVisaTypes.includes(b.currentVisaType || '')
    return (bDirectMatch ? 1 : 0) - (aDirectMatch ? 1 : 0)
  })
  
  // Prepare notifications with personalized content
  const notifications = prioritizedUsers.map(user => {
    const isDirectlyAffected = update.affectedVisaTypes.includes(user.currentVisaType || '')
    const content = isDirectlyAffected
      ? `Important immigration update affecting your ${user.currentVisaType} visa: ${update.content}`
      : `Immigration update for visa types ${update.affectedVisaTypes.join(', ')}: ${update.content}`
    
    return {
      user_id: user.id,
      type: 'immigration_update',
      priority: isDirectlyAffected ? 'high' : 'medium',
      content,
      metadata: {
        update_id: update.id,
        affected_visa_types: update.affectedVisaTypes,
        effective_date: update.effectiveDate
      },
      created_at: new Date().toISOString(),
      read: false
    }
  })
  
  // Batch insert notifications
  const batchSize = 100
  const batches = []
  
  for (let i = 0; i < notifications.length; i += batchSize) {
    const batch = notifications.slice(i, i + batchSize)
    batches.push(
      supabase.from('notifications').insert(batch)
    )
  }
  
  try {
    await Promise.all(batches)
    return true
  } catch (error) {
    console.error('Failed to send notifications:', error)
    return false
  }
} 