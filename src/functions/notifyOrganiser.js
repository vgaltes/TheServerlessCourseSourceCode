module.exports.handler = async (event, context) => {
    const orderPlaced = JSON.parse(event.Records[0].Sns.Message);
  
    console.log(`notified organiser [${orderPlaced.getTogetherId}, ${orderPlaced.orderId}, ${orderPlaced.userEmail}]`);
  
    return "all done";
  };