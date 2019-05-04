/* eslint-disable import/no-unresolved */
const AWS = require("aws-sdk");
const chance = require("chance").Chance();
const sns = new AWS.SNS();
const log = require("../lib/log");

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const getTogetherId = body.getTogetherId;
  const userEmail = body.getTogetherId;

  const orderId = chance.guid();
  log.info("user requesting to join gettogether", {userEmail, getTogetherId});

  const data = {
    orderId,
    getTogetherId,
    userEmail
  };

  const params = {
    Message: JSON.stringify(data),
    TopicArn: process.env.joinGetTogetherSnsTopic
  };

  await sns.publish(params).promise();

  log.info("published 'join_getTogether' event", {orderId, getTogetherId, userEmail});

  const response = {
    statusCode: 200,
    body: JSON.stringify({ orderId })
  };

  return response;
};