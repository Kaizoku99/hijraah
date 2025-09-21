/**
 * Test script for suggestions caching
 * 
 * Run with: node --loader ts-node/esm test-suggestions-cache.mjs
 */

import { performance } from 'perf_hooks';

// Mock the suggestions cache for testing
const testSuggestions = [
  { text: "Can you explain the Canada Express Entry requirements?", category: "initial", confidence: 0.9 },
  { text: "What documents do I need for visa application?", category: "initial", confidence: 0.8 },
  { text: "How long does the process take?", category: "initial", confidence: 0.7 },
  { text: "What are the eligibility criteria?", category: "initial", confidence: 0.6 }
];

async function testSuggestionsAPI() {
  console.log("🧪 Testing Suggestions API with Redis Caching...\n");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const endpoint = `${baseUrl}/api/suggestions/generate`;
  
  const testRequest = {
    messages: [
      { role: "user", content: "I want to immigrate to Canada" }
    ],
    type: "initial",
    context: {
      conversationLength: 1,
      lastUserMessage: "I want to immigrate to Canada",
      lastAssistantMessage: ""
    }
  };

  // Test 1: First request (should be a cache miss)
  console.log("🔍 Test 1: First request (cache miss)");
  const start1 = performance.now();
  
  try {
    const response1 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token' // Replace with actual token
      },
      body: JSON.stringify(testRequest)
    });
    
    const end1 = performance.now();
    const data1 = await response1.json();
    
    console.log(`✅ Status: ${response1.status}`);
    console.log(`⏱️  Response time: ${(end1 - start1).toFixed(2)}ms`);
    console.log(`📊 Suggestions count: ${data1.length || 'Error'}`);
    console.log(`💾 Cache status: ${response1.headers.get('X-Cache') || 'N/A'}\n`);
    
    if (!response1.ok) {
      console.error("❌ First request failed:", data1);
      return;
    }
  } catch (error) {
    console.error("❌ First request error:", error.message);
    return;
  }

  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 100));

  // Test 2: Second identical request (should be a cache hit)
  console.log("🔍 Test 2: Second identical request (cache hit)");
  const start2 = performance.now();
  
  try {
    const response2 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token' // Replace with actual token
      },
      body: JSON.stringify(testRequest)
    });
    
    const end2 = performance.now();
    const data2 = await response2.json();
    
    console.log(`✅ Status: ${response2.status}`);
    console.log(`⏱️  Response time: ${(end2 - start2).toFixed(2)}ms`);
    console.log(`📊 Suggestions count: ${data2.length || 'Error'}`);
    console.log(`💾 Cache status: ${response2.headers.get('X-Cache') || 'N/A'}\n`);
    
    // Performance comparison
    const speedup = ((end1 - start1) / (end2 - start2)).toFixed(2);
    console.log(`🚀 Cache speedup: ${speedup}x faster\n`);
    
  } catch (error) {
    console.error("❌ Second request error:", error.message);
    return;
  }

  // Test 3: Different request (should be a cache miss)
  console.log("🔍 Test 3: Different request (cache miss)");
  const differentRequest = {
    ...testRequest,
    messages: [
      { role: "user", content: "I want to immigrate to Australia" }
    ],
    context: {
      ...testRequest.context,
      lastUserMessage: "I want to immigrate to Australia"
    }
  };

  const start3 = performance.now();
  
  try {
    const response3 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token' // Replace with actual token
      },
      body: JSON.stringify(differentRequest)
    });
    
    const end3 = performance.now();
    const data3 = await response3.json();
    
    console.log(`✅ Status: ${response3.status}`);
    console.log(`⏱️  Response time: ${(end3 - start3).toFixed(2)}ms`);
    console.log(`📊 Suggestions count: ${data3.length || 'Error'}`);
    console.log(`💾 Cache status: ${response3.headers.get('X-Cache') || 'N/A'}\n`);
    
  } catch (error) {
    console.error("❌ Third request error:", error.message);
  }

  // Test cache stats
  console.log("🔍 Test 4: Cache statistics");
  try {
    const statsResponse = await fetch(`${baseUrl}/api/suggestions/cache`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer test-token' // Replace with actual token
      }
    });
    
    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      console.log("📈 Cache stats:", JSON.stringify(stats, null, 2));
    } else {
      console.log("❌ Failed to get cache stats:", statsResponse.status);
    }
  } catch (error) {
    console.log("❌ Cache stats error:", error.message);
  }

  console.log("\n✨ Test completed!");
}

// Export for use in other files
export { testSuggestionsAPI };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testSuggestionsAPI().catch(console.error);
}
