const http = require("superagent-promise")(require("superagent"), Promise);

async function viaHandler(functionPath, event) {
    const handler = require(`../../src/functions/${functionPath}`);
    const response = await handler.handler(event);
    response.body = JSON.parse(response.body);
    return response;
}

async function viaHttp(functionPath) {
    const apiRoot = process.env.TEST_BASE_URL;
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

module.exports.we_invoke_get_gettogethers = () => {
    const mode = process.env.TEST_MODE;
  
    return mode === "http"
      ? viaHttp(`getTogethers`, "GET")
      : viaHandler("getGetTogethers");
  }