const AWSXray = require("aws-xray-sdk")
const AWS = AWSXray.captureAWS(require("aws-sdk"));
const middy = require("middy");
const { ssm } = require("middy/middlewares");
const log = require("../lib/log");
const captureCorrelationId = require("../middleware/captureCorrelationId");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const handler = async (event, context) => {

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
};

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