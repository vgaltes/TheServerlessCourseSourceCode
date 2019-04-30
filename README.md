# The Serverless Course

## Cuenta en AWS
Vamos a utilizar AWS Lambda, así que necesitas tener una cuenta en AWS. No te preocupes, puedes crear una cuenta gratuita sin problemas [aquí](https://aws.amazon.com/free/start-your-free-trial/). Las cosas que vamos a hacer durante el curso no deberían hacerte gastar un céntimo en AWS. Habrá algún ejercicio opcional en el que si que puedes incurrir en gastos. Pero será opcional y lo avisaré.

Vamos a necesitar un par de usuarios en tu cuenta para el curso. Uno será el que utilizaremos en local para desplegar y probar la aplicación. El segundo será el que utilizará nuestro sistema de integración contínua para desplegar y probar la aplicación. Vamos a por ello: repite los siguientes pasos dos veces (una por usuario) con diferentes nombres de usuario.
 - Haz login en tu cuenta de AWS y ve a la página Identity & Access Management (IAM)
 - Haz click en Users y después en Add User. Introduce `serverless-local` como nombre para el primer usuario y `serverless-agent` como nombre para el segundo usuario. Activa Programmatic Access. Haz click en Next para ir a la página de permisos. Haz click en Attach existing policies directly y selecciona la policy llamada AdministratorAccess (la primera).
 - Clica en Next: tags. 
 - Clica en Next: review. Chequea que todo está bien y clica en Create user. 
 - Visualiza y copia la API Key y el Secret a un lugar temporal. Lo necesitaremos más tarde.

Esto no es una buena práctica. La buena práctica sería dar los mínimos permisos posibles a este usuario (y a todos). Para hacerlo, crearíamos una policy en la que especificaríamos los mínimos permisos (algo como lo que puedes encontrar [aqui](https://gist.githubusercontent.com/ServerlessBot/7618156b8671840a539f405dea2704c8/raw/bfc213d5b20ad0192217d5035ff526792535bdab/IAMCredentials.json)) y asiganaríamos esa policy al usurio. Cada vez que viéramos que nos falta un permiso, deberíamos cambiar la policy. Para no tener que ir haciendo esto cada dos por tres, asignamos el usuario al grupo Administrators, pero no debéis hacer esto en un proyecto en producción. Hay herramientas que nos pueden ayudar como [esta](https://www.trek10.com/blog/excess-access-exorcism-with-aws-config/) o [esta](https://github.com/dancrumb/generator-serverless-policy).

## Cuenta en Epsagon
Cuando hablemos de monitorización vamos a utilizar una herramienta llamada Epsagon. Tendrías que prepararla para que todo nos vaya fluido. Ve a su [página web](https://epsagon.com/) y date de alta en el servicio gratuito. Cuando te des de alta, te explicarán lo que tienes que hacer. Básicamente deberás desplegar un CloudFormation en tu cuenta AWS y anotarte el Token que utilizaremos después.

## Cómo avanzar en este curso
Para poder ir avanzando en el curso, vas a tener que ser capaz de ir subiendo tus cambios al repositorio a medida que vayamos avanzando para que el sistema de integración contínua pueda hacer su trabajo. Por lo tanto, puedes hacer dos cosas:
 - Forkear este repositorio y trabajar siempre en master. Haz tus cambios en master y súbelos. Si necesitas ver como está un archivo en una rama en concreto, siempre puedes venir al repositorio original y mirar como está.
 - Crearte tu propio repositorio vacío y copiarte los ficheros que hay en master.
 
Cualquiera de las tres opciones es buena. Sólo recuerda que si escoges la solución 1, si vas a una rama, tendrás la solución final para esa rama.

## Creación de un profile en nuestro ordenador.
Ahora es la hora de configurar nuestro ordenador para que utilice estas credenciales a la hora de desplegar nuestra aplicación. Hay varias maneras de hacer esto pero la mejor es utilizar un profile y que este no sea el profile por defecto, para evitar posibles desgracias en el futuro.

Para setear este profile hay varias maneras, pero la más cómoda es utilizar el propio [Serverless framework](https://serverless.com). Así ve al directorio preRequisites, instala los paquetes npm utilizando el comando `npm install`. Una vez instalados, ejecuta el siguiente comando: `npx serverless config credentials --provider aws --key <tu_key> --secret <tu_secret> --profile serverless-local`

Dónde `tu_key` y `tu_secret` son los datos que nos hemos guardado del paso anterior para el usuario serverless-local. Las claves para el usuario serverless-agent las utilizaremos más tarde, así que guárdalas bien. Con esto ya tendremos el profile creado.
