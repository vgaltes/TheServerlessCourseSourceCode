const log = require("../lib/log");
const middy = require("middy");
const captureCorrelationId = require("../middleware/captureCorrelationId");

const handler = async (event, context) => {
  const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

  if (orderPlaced.getTogetherId === "error"){
    throw new Error("Simulating error");
  }

  log.info("notified organiser", { getTogetherId: orderPlaced.getTogetherId, orderId: orderPlaced.orderId, userEmail: orderPlaced.userEmail });

  return "all done";
};

module.exports.handler = middy(handler).use(captureCorrelationId());
