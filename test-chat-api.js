const fetch = require("node-fetch");

async function testChatAPI() {
  const baseUrl = "http://localhost:3000";

  // Test different orderBy parameters
  const testCases = [
    "createdAt:desc",
    "created_at:desc",
    "updatedAt:desc",
    "lastMessageAt:desc",
    "title:asc",
  ];

  for (const orderBy of testCases) {
    console.log(`\nTesting orderBy: ${orderBy}`);

    try {
      const response = await fetch(
        `${baseUrl}/api/chat?orderBy=${orderBy}&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer dummy-token",
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.text();
      console.log(`Status: ${response.status}`);
      console.log(`Response: ${result.substring(0, 200)}...`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

testChatAPI().catch(console.error);
