const express = require('express');
const cors = require('cors');
require('colors');

const { dbConnection } = require('../databases/config.db');

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();

        //Middleware
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {

        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }


    routes() {

        //Middleware que configura endpoint de nustra api -> http://localhost:8080/api/usuarios/?
        this.app.use(this.usuariosPath, require('../routes/users.routes'));
    }


    listen() {

        this.app.listen(this.port, () => {
            console.log(`\nServidor corriendo en el puerto ${this.port.green} -  http://localhost:${this.port.green}`)
        })

    }
}

module.exports = Server;
