#!/usr/bin/env node

// Test Redis imports to verify no version conflicts
console.log('🔍 Testing Redis imports...\n');

try {
  // Test main redis package
  const { createClient } = await import('redis');
  console.log('✅ redis package imported successfully');
  
  // Test ioredis
  const Redis = await import('ioredis');
  console.log('✅ ioredis package imported successfully');
  
  // Test upstash redis
  const { Redis: UpstashRedis } = await import('@upstash/redis');
  console.log('✅ @upstash/redis package imported successfully');
  
  console.log('\n🎉 All Redis packages imported without conflicts!');
  console.log('✅ Redis version conflicts appear to be resolved');
  
} catch (error) {
  console.error('❌ Error importing Redis packages:', error.message);
  process.exit(1);
}