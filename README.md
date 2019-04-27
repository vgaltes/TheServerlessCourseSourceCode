# TheServerlessCourseSourceCode
Código para el curso de Serverless

Inicializar el proyecto npm:
```
npm init
```

Instalar el framework serverless

```
npm install --save-dev serverless
```

Crear el serverless.yml

```
service: gettogether

provider:
  name: aws
  runtime: nodejs8.10
  region: eu-west-1
  stage: dev

functions:
  helloWorld:
    handler: src/functions/helloWorld.handler
    events:
      - http:
          path: api/helloWorld
          method: get
```

crear el src/functions/helloWorld.js

```
module.exports.handler = async event => {
    console.log(JSON.stringify(event));

    const { name } = event.queryStringParameters;

    const res = {
        statusCode: 200,
        body: JSON.stringify(`Hello ${name}`)
    };

    return res;
};
```

Deployar

```
AWS_PROFILE=serverless-local npx serverless deploy
```

```
npx serverless deploy --aws-profile serverless-local
```

Hacer un get a la función e ir a cloudwatch a ver qué ha pasado

Añadir .serverless al .gitignore