
# Web Server + RestServer

#### App productiva - url: https://app-rest-node-app.herokuapp.com/

Ejecutar el comando ```npm install``` para reconstruir los modulos de node

- 1.- Inicializando servidor con express y configurando el puerto como una variable(dotenv)
- 2.- Configurando el servidor como una clase
- 3.- Creando las peticiones de un CRUD
- 4.- Instalación de CORS - facilitar o restringir la acomunicación entre apis
- 5.- Configurando el router
- 6.- Creando las funciones controlador
- 7.- Obtenindo datos del POST usando el req.body
- 8.- Obteniendo la info que llega como parametro o como query
- 9.- Creando cluster y usuario en mongoDB
- 10.- Configuración entre mongoDB cloud y mongo compass
- 11.- Configurando conexión a la base de datos
- 12.- Definiendo el Schema/modelo que se usara en la api
- 13.- Hacer persistente la información en la base de datos - método post
- 14.- Encriptando la contraseña con el paquete bcryptjs
- 15.- (express-validator) Validando registro previo de correo
- 16.- (express-validator) Validando registro de correo sea en formato correcto
- 17.- (express-validator) Validando correo, nombre y rol
- 18.- (express-validator) usando middleware para validar campos
- 19.- (express-validator - mongoose) Validando rol contra la base de datos
- 20.- Uso de carpeta helpers para centralizar la validación del rol
- 21.- Metodo toJSON usado en el módelo del objeto usuario para mostrar en la creación del objeto los campos que sólo se quieran mostrar
- 22.- Validando existencia de correo
- 23.- Implementación de handler put - actualizarUsuarios
- 24.- Validaciones adicionales en put
- 25.- (GET) Leyendo y mostrando todos los datos guardados
- 26.- (GET) Paginando y liminado el número de registros a mostrar
- 27.- (GET) Retornar número total de registros en una collección - uso de promise - async/await
- 28.- (DELETE) Integridad referencial. En este ejemplo, la referencia del documento en la base de datos se conserva, pero no se borra de la bd, solo se cambia de estado, así no se elimina completamente un registro pero se muestra como eliminado de los registros para los usuarios.
- 29.- Actualizando repo productivo en heroku
- 30.- Cambiando las variables e entorno del proyecto en local a el repo de heroku
    - *** En este commit se cambió la variable de entorno MONGODB_CNN configurandola de manera productiva a heroku ***
    -
    - Crear variables de entorno:
        - Conocer las variables de entorno configuradas ```heroku config```
        - Agregar una variable de entorno ```heroku config:set NOMBRE_DE_VARIABLE="valor_de_variable"```
            - ejemplo: ```heroku config:set NOMBRE="César"```
        - Borrar una variable de entorno ```heroku config:unset nombre_variable_borrar```
    - Ejemplo de configurar cadena de conexión a heroku:
        -  heroku config:set MONGODB_CNN="mongodb+srv://<nombre_usuario>:<contraseña>@<nombreclusther><nombre_colección>"

### JWT - AUTHENTICACIÓN - TOKEN DE ACCESO

- 31.- Creación de la ruta que permite authenticar el login (controller - ruta - handler)
- 32.- Configurando la validación correo existente, usuario activo(borrado) y contraseña valida para generar el login
- 33.- (JWT) Utilizado la libreria jsonwebtoken para generar el token de autenticación y configurando el métedo que permite la autenticación en los helpers
- 34.- Se cambia visualmente _id por uid en la clase modelo del usuario que le indica a moongo como crear el documento
- 35- Uso de middleware para generar la validación del JWT, el cual va a permitir generar acciones sobre nuestras rutas/vistas
- 36.- Obteniendo información del usuario autenticado
- 37.- Configurando que al cambiar el estado de un registro a false se invalide el token generado y de esta manera evitar el login del egistro eliminado
- 38.- Validando que el usuario exista en la base de datos, en caso de no existir no permitir que el token sea valido
- 39.- Se crea un middleware que permite validar si el rol del usuario es ADMIN_ROLE -> para la prueba esto va  permitir que si se tiene el rol anteriormente mencionado este usuario ADMIN va a poder borrar(cambiar estado) de la base de datos
- 40 .- Se crea un middleware que permite validar los roles y con ello permitir accions en los diferents handlers, para el ejercicio es en el handler deleteUsuario
