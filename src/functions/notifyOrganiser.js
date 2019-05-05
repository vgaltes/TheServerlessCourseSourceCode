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
  const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

  if (orderPlaced.getTogetherId === "error"){
    throw new Error("Simulating error");
  }

  log.info("notified organiser", { getTogetherId: orderPlaced.getTogetherId, orderId: orderPlaced.orderId, userEmail: orderPlaced.userEmail });

  return "all done";
});

module.exports.handler = middy(handler).use(captureCorrelationId());
