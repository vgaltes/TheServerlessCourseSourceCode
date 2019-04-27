const handler = require(`../src/functions/helloWorld`);

describe(`When we invoke the GET /helloWorld endpoint`, () => {
    test(`Should return the right greeting`, async () => {
      const name = "Manolito";
      const event = { pathParameters: { name: name } };
      const response = await handler.handler(event);
      response.body = JSON.parse(response.body);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("Hello Manolito")
    });
  });
