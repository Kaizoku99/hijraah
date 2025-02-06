import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { HTTPException } from 'hono/http-exception';
import { withCircuitBreaker } from '../circuit-breaker';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Connection pool configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const CONNECTION_POOL_SIZE = 10;

type SupabaseClientType = SupabaseClient<Database>;

// Connection pool
let clientPool: SupabaseClientType[] = [];
let currentPoolIndex = 0;

// Circuit breaker configuration
const CIRCUIT_BREAKER_OPTIONS = {
  failureThreshold: 3,
  resetTimeout: 30000, // 30 seconds
  halfOpenRetries: 2,
  monitorInterval: 5000, // 5 seconds
  onStateChange: (from: string, to: string) => {
    console.log(`Supabase circuit breaker state changed from ${from} to ${to}`);
  },
  onError: (error: Error) => {
    console.error('Supabase circuit breaker error:', error);
  },
};

// Initialize connection pool
function initializePool() {
  try {
    for (let i = 0; i < CONNECTION_POOL_SIZE; i++) {
      if (!supabaseUrl || !supabaseAnonKey) continue;
      
      const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        db: {
          schema: 'public',
        },
        global: {
          headers: {
            'x-connection-id': `pool-${i}`,
          },
        },
      });

      clientPool.push(client);
    }

    if (clientPool.length === 0) {
      throw new Error('Failed to initialize any connections in the pool');
    }
  } catch (error) {
    console.error('Error initializing Supabase connection pool:', error);
    throw new Error('Failed to initialize Supabase connection pool');
  }
}

// Get next client from pool
function getNextClient(): SupabaseClientType {
  if (clientPool.length === 0) {
    initializePool();
  }
  const client = clientPool[currentPoolIndex];
  currentPoolIndex = (currentPoolIndex + 1) % CONNECTION_POOL_SIZE;
  return client;
}

// Create Supabase client with retry logic and circuit breaker
export async function getSupabaseClient(options: {
  useServiceRole?: boolean;
  retryCount?: number;
} = {}): Promise<SupabaseClientType> {
  const retryCount = options.retryCount || 0;

  return withCircuitBreaker(
    'supabase',
    async () => {
      try {
        // Use service role key for admin operations if requested
        if (options.useServiceRole) {
          if (!supabaseServiceKey || !supabaseUrl) {
            throw new Error('Service role key or URL not provided');
          }

          return createClient<Database>(supabaseUrl, supabaseServiceKey, {
            auth: {
              persistSession: false,
              autoRefreshToken: false,
            },
            db: {
              schema: 'public',
            },
          });
        }

        return getNextClient();
      } catch (error) {
        console.error('Error getting Supabase client:', error);

        // Retry logic
        if (retryCount < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retryCount)));
          return getSupabaseClient({
            ...options,
            retryCount: retryCount + 1,
          });
        }

        throw new HTTPException(500, { message: 'Failed to connect to database' });
      }
    },
    async () => {
      // Fallback to a new client if the pool fails
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase credentials not available');
      }

      return createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    },
    CIRCUIT_BREAKER_OPTIONS
  );
}

// Health check function with circuit breaker
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const client = await withCircuitBreaker(
      'supabase-health',
      async () => getSupabaseClient(),
      undefined,
      CIRCUIT_BREAKER_OPTIONS
    );

    const { error } = await client.from('_health').select('*').limit(1).single();
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase health check failed:', error);
    return false;
  }
}

// Cleanup function
export async function closeSupabaseConnections(): Promise<void> {
  try {
    await Promise.all(clientPool.map(client => client.auth.signOut()));
    clientPool = [];
    currentPoolIndex = 0;
  } catch (error) {
    console.error('Error closing Supabase connections:', error);
  }
} 