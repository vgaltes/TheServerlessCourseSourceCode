'use strict';

const log = require('../lib/log');

function captureHttp(headers, awsRequestId) {
    let correlationId = awsRequestId;
    if (!headers) {
        log.warn(`Request ${awsRequestId} is missing headers`);
        return;
    }

    for (const header in headers) {
        if (header.toLowerCase() === 'x-correlation-id') {
            correlationId = headers[header];
        }
    }

    process.env.correlationId = correlationId;
}

function captureSns(records, awsRequestId, sampleDebugLogRate) {
    let correlationId = awsRequestId;
    const snsRecord = records[0].Sns;
    const msgAttributes = snsRecord.MessageAttributes;

    for (var msgAttribute in msgAttributes) {
        if (msgAttribute.toLowerCase() === 'x-correlation-id') {
            correlationId = msgAttributes[msgAttribute].Value;
        }
    }

    process.env.correlationId = correlationId;
}

function isApiGatewayEvent(event) {
    return event.hasOwnProperty('httpMethod')
}

function isSnsEvent(event) {
    if (!event.hasOwnProperty('Records')) {
        return false;
    }

    if (!Array.isArray(event.Records)) {
        return false;
    }

    return event.Records[0].EventSource === 'aws:sns';
}

module.exports = (config) => {
    return {
        before: (handler, next) => {
            if (isApiGatewayEvent(handler.event)) {
                captureHttp(handler.event.headers, handler.context.awsRequestId);
            } else if (isSnsEvent(handler.event)) {
                captureSns(handler.event.Records, handler.context.awsRequestId);
            }

            next()
        }
    };
};
