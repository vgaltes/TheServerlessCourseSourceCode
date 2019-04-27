async function viaHandler(functionPath, event) {
    const handler = require(`../../src/functions/${functionPath}`);
    const response = await handler.handler(event);
    response.body = JSON.parse(response.body);
    return response;
}

module.exports.we_invoke_helloWorld = (name) => {
    const event = { pathParameters: { name: name } };

    return viaHandler("helloWorld", event);
}