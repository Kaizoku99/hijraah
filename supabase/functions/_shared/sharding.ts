import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { PostgrestError } from '@supabase/postgrest-js'

export interface ShardConnection {
  shardKey: string
  connectionString: string
  client?: SupabaseClient
  isActive: boolean
  isPrimary: boolean
  isReplica: boolean
}

// Initialize the Supabase client for the central database
const centralClient = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
)

// Cache of initialized shard connections
const shardConnections = new Map<string, ShardConnection>()

/**
 * Get a client for the shard containing the specified entity
 * @param entityType Type of entity (e.g., user, document)
 * @param entityId ID of the entity
 * @param forWrite Whether the operation is for writing (if false, might use a replica)
 * @returns Supabase client for the appropriate shard
 */
export async function getShardClient(
  entityType: string,
  entityId: string,
  forWrite: boolean = true
): Promise<SupabaseClient> {
  try {
    // Get the connection information for this entity
    const { data, error } = await centralClient.rpc('sharding.get_connection_string', {
      p_entity_type: entityType,
      p_entity_id: entityId,
      p_for_write: forWrite
    })

    if (error) {
      console.error('Error getting shard connection string:', error)
      // Fall back to the central client if there's an error
      return centralClient
    }

    if (!data) {
      console.warn('No shard connection string found for', entityType, entityId)
      // Fall back to the central client if no connection string is found
      return centralClient
    }

    const connectionString = data as string
    
    // Get or create the Supabase client for this connection string
    const client = getOrCreateClientForConnectionString(connectionString)
    
    return client
  } catch (error) {
    console.error('Unexpected error in getShardClient:', error)
    // Fall back to the central client for any error
    return centralClient
  }
}

/**
 * Initialize or get a cached client for a connection string
 * @param connectionString Database connection string
 * @returns Supabase client for the connection
 */
function getOrCreateClientForConnectionString(connectionString: string): SupabaseClient {
  // Parse the connection string to get the URL
  // format: postgres://username:password@hostname:port/database
  const url = new URL(connectionString.replace('postgres://', 'http://'))
  const hostname = url.hostname
  const port = url.port
  const database = url.pathname.replace('/', '')
  
  // Create a unique key for this connection
  const key = `${hostname}:${port}/${database}`
  
  // Check if we already have a client for this connection
  if (shardConnections.has(key)) {
    const connection = shardConnections.get(key)!
    if (connection.client) {
      return connection.client
    }
  }
  
  // Create a new client
  // Note: In a real implementation, we would need to get the anon key and service role key
  // from a secure source, not hardcode them here
  const client = createClient(
    `https://${hostname}`,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  )
  
  // Cache the client
  shardConnections.set(key, {
    shardKey: key,
    connectionString,
    client,
    isActive: true,
    isPrimary: true, // Assuming it's primary for now
    isReplica: false
  })
  
  return client
}

/**
 * Perform an operation across all shards
 * @param operation Function that performs the operation on a shard
 * @param forWrite Whether the operation is for writing (if false, might use replicas)
 * @returns Array of results from all shards
 */
export async function executeAcrossAllShards<T>(
  operation: (client: SupabaseClient, shardKey: string) => Promise<T>,
  forWrite: boolean = false
): Promise<T[]> {
  try {
    // Get all shard connections
    const { data, error } = await centralClient.rpc('sharding.get_all_shard_connections', {
      p_for_write: forWrite
    })
    
    if (error) {
      console.error('Error getting all shard connections:', error)
      throw error
    }
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn('No shard connections found')
      // Fall back to the central client
      const result = await operation(centralClient, 'central')
      return [result]
    }
    
    // Execute the operation on each shard in parallel
    const results = await Promise.all(
      data.map(async (conn: { shard_key: string, connection_string: string }) => {
        const client = getOrCreateClientForConnectionString(conn.connection_string)
        return operation(client, conn.shard_key)
      })
    )
    
    return results
  } catch (error) {
    console.error('Unexpected error in executeAcrossAllShards:', error)
    // Fall back to the central client for any error
    const result = await operation(centralClient, 'central')
    return [result]
  }
}

/**
 * Check if sharding is enabled
 * @returns Whether sharding is enabled
 */
export async function isShardingEnabled(): Promise<boolean> {
  try {
    const { data, error } = await centralClient.from('sharding.config')
      .select('enabled')
      .single()
    
    if (error) {
      console.error('Error checking if sharding is enabled:', error)
      return false
    }
    
    return data?.enabled ?? false
  } catch (error) {
    console.error('Unexpected error in isShardingEnabled:', error)
    return false
  }
}

/**
 * Get the appropriate Supabase client based on the current sharding status
 * This is a convenience function that checks if sharding is enabled and returns
 * either the shard client or the central client
 * 
 * @param entityType Type of entity
 * @param entityId ID of the entity
 * @param forWrite Whether the operation is for writing
 * @returns The appropriate Supabase client
 */
export async function getClient(
  entityType: string,
  entityId: string,
  forWrite: boolean = true
): Promise<SupabaseClient> {
  const shardingEnabled = await isShardingEnabled()
  
  if (shardingEnabled) {
    return getShardClient(entityType, entityId, forWrite)
  } else {
    return centralClient
  }
} 