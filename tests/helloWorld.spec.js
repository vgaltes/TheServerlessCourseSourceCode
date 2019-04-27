const when = require("./steps/when");

describe(`When we invoke the GET /helloWorld endpoint`, () => {

  test(`Should return the right greeting`, async () => {
    const name = "Manolito";
    const res = await when.we_invoke_helloWorld(name);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("Hello Manolito")
  });
});
