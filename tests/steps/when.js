const http = require("superagent-promise")(require("superagent"), Promise);

async function viaHandler(functionPath, event) {
    const handler = require(`../../src/functions/${functionPath}`);
    const response = await handler.handler(event);
    response.body = JSON.parse(response.body);
    return response;
}

async function viaHttp(functionPath) {
    const apiRoot = "https://zusp1o2cq3.execute-api.eu-west-1.amazonaws.com/dev/api";
    const method = "GET";

    const url = `${apiRoot}/${functionPath}`;

    console.log(url);

    try {
        const httpReq = http(method, url);
        const res = await httpReq;

        return {
            statusCode: res.status,
            body: res.body
        };
    } catch (err) {
        if (err.status) {
            return {
                statusCode: err.status
            };
        }
        throw err;
    }
}

module.exports.we_invoke_helloWorld = (name) => {
    const event = { pathParameters: { name: name } };

    const mode = process.env.TEST_MODE;

    return mode === "http"
        ? viaHttp(`helloWorld/${name}`, "GET")
        : viaHandler("helloWorld", event);
}