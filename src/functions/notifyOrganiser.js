const log = require("../lib/log");

module.exports.handler = async (event, context) => {
    const orderPlaced = JSON.parse(event.Records[0].Sns.Message);
  
    log.info("notified organiser", {getTogetherId: orderPlaced.getTogetherId, orderId: orderPlaced.orderId, userEmail: orderPlaced.userEmail});
  
    return "all done";
  };