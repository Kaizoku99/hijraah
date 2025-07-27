// Authentication test
pm.test("Unauthorized access should be blocked", function () {
  pm.response.to.have.status(401);
});

// Data validation test
pm.test("Sensitive data should not be exposed", function () {
  const response = pm.response.json();
  pm.expect(response).to.not.have.property("password");
});
