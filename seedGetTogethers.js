const AWS = require("aws-sdk");

AWS.config.region = "eu-west-1";
const dynamodb = new AWS.DynamoDB.DocumentClient();

const req = {
    RequestItems: {
        gettogethers: [
            {
                PutRequest:{
                    Item: {
                        id: 0,
                        name: "Programación funcional en la playa",
                        description: "Nos vamos a la playa y hablamos de mónadas, functors y demás cosas raras."
                    }
                }
            }
        ]
    }
}

dynamodb
  .batchWrite(req)
  .promise()
  .then(() => console.log("all done"))
  .catch(e => console.log(e));