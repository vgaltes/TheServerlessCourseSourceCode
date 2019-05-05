const chance = require("chance").Chance();
const sns = require("../lib/snsClient");
const log = require("../lib/log");
const middy = require("middy");
const captureCorrelationId = require("../middleware/captureCorrelationId");
const epsagon = require("epsagon");

epsagon.init({
  token: "4631348e-1228-44f4-937b-0a503d298a8c",
  appName: process.env.service,
  metadataOnly: false
});

const handler = epsagon.lambdaWrapper(async (event, context) => {
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
});

module.exports.handler = middy(handler).use(captureCorrelationId());