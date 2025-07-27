// In Postman, add this Pre-request Script to your collection
if (!pm.environment.get("auth_token")) {
  // Replace with your auth logic
  const authToken = "your-auth-token";
  pm.environment.set("auth_token", authToken);
}
