'use strict';

const log = require('../lib/log');

function captureHttp(headers, awsRequestId) {
    let correlationId = "";
    if (!headers) {
        log.warn(`Request ${awsRequestId} is missing headers`);
        return;
    }

    for (const header in headers) {
        if (header.toLowerCase() === 'x-correlation-id') {
            correlationId = headers[header];
        }
    }

    if (!correlationId) {
        correlationId = awsRequestId;
    }

    process.env.correlationId = correlationId;
}

function isApiGatewayEvent(event) {
    return event.hasOwnProperty('httpMethod')
}

module.exports = (config) => {
    return {
        before: (handler, next) => {
            if (isApiGatewayEvent(handler.event)) {
                captureHttp(handler.event.headers, handler.context.awsRequestId);
            }

            next()
        }
    };
};
