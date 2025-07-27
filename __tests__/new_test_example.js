pm.test("New feature test", function () {
  const responseData = pm.response.json();
  pm.expect(responseData.newFeature).to.exist;
});
