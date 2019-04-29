const AWS = require("aws-sdk");

const tableName = process.argv.slice(2)[0];

AWS.config.region = "eu-west-1";
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getTogethers = [
  {
    id: 1,
    name:
      "Programación funcional en la playa",
    description:
      "Nos vamos a la playa y hablamos de mónadas, functors y demás cosas raras."
  },
  {
    id: 2,
    name: "Cocinillas",
    description:
      "Quedamos para pasarnos nuestras mejores recetas y hablar de los ingredientes más raros que conocemos."
  },
  {
    id: 3,
    name: "Makers",
    description:
      "Hacemos cosas, generalmente con algo de tecnología."
  },
  {
    id: 4,
    name: "Grupo de auto-ayuda de gente que intenta aprender inglés",
    description:
      "Lo hemos probado todo, desde ver series en Netflix hasta irnos una semana a Irlanda, pero nuestro acento sigue siendo horroroso y nuestro vocabulario el mismo de cuando hacíamos EGB."
  },
  {
    id: 5,
    name: "Futboleros",
    description:
      "Creemos que se habla demasiado poco de fútbol en este país, así que nos juntamos para hablar de fútbol."
  },
  {
    id: 6,
    name: "Filosofía",
    description:
      "No tenemos ni idea de lo que hablamos, pero hablamos mucho, pero que mucho."
  },
  {
    id: 7,
    name: "Caligrafía",
    description:
      "Nos juntamos para criticar a los que hacen lettering, que son unos flojos y no se atreven con la caligrafía de verdad."
  },
  {
    id: 8,
    name: "Periodismo",
    description:
      "Recordamos cuando no todo eran debates de opinión y cuando se contrastaban las noticias antes de darlas."
  }
];

const putReqs = getTogethers.map(x => ({
  PutRequest: {
    Item: x
  }
}));

const req = {
  RequestItems: {
    [tableName]: putReqs
  }
};

dynamodb
  .batchWrite(req)
  .promise()
  .then(() => console.log("all done"))
  .catch(e => console.log(e));