const AWSXray = require("aws-xray-sdk")
const AWS = AWSXray.captureAWS(require("aws-sdk"));
const middy = require("middy");
const { ssm } = require("middy/middlewares");
const log = require("../lib/log");
const captureCorrelationId = require("../middleware/captureCorrelationId");
const epsagon = require("epsagon");

epsagon.init({
  token: "4631348e-1228-44f4-937b-0a503d298a8c",
  appName: process.env.service,
  metadataOnly: false
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const handler = epsagon.lambdaWrapper(async (event, context) => {

    log.info("Getting gettogethers");
  const count = 8;

  const req = {
    TableName: context.tableName,
    Limit: count
  };

  const resp = await dynamodb.scan(req).promise();

  const res = {
    statusCode: 200,
    body: JSON.stringify(resp.Items)
  };

  return res;
});

module.exports.handler = middy(handler).use(
    ssm({
      cache: true,
      cacheExpiryInMillis: 3 * 60 * 1000,
      setToContext: true,
      names: {
        tableName: `${process.env.getTogethersTableName}`
      }
    })
  ).use(captureCorrelationId());