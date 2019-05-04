'use strict';

const AWS = require('aws-sdk');
const SNS = new AWS.SNS();
const log = require("../lib/log");

function addCorrelationId(messageAttributes) {
    let attributes = {};
    attributes["x-correlation-id"] = {
        DataType: 'String',
        StringValue: process.env.correlationId
    };

    return Object.assign(attributes, messageAttributes || {});
}

function publish(params, cb) {
    const newMessageAttributes = addCorrelationId(params.MessageAttributes);
    params = Object.assign(params, { MessageAttributes: newMessageAttributes });

    log.info("Sending message", params);

    return SNS.publish(params, cb);
};

const client = Object.assign({}, SNS, { publish });

module.exports = client;