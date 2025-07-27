// Basic response validation
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

// Response data validation
pm.test("Response has expected data", function () {
  const responseData = pm.response.json();
  pm.expect(responseData).to.have.property("id");
  pm.expect(responseData.status).to.eql("success");
});
