const express = require('express');
const cors = require('cors');
require('colors');

const { dbConnection } = require('../databases/config.db');

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:        '/api/auth',
            categorias:  '/api/categorias',
            productos:    '/api/productos',
            usuarios:    '/api/usuarios'
        }


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

        this.app.use(this.paths.auth, require('../routes/auth.routes.js'));
        //Middleware que configura endpoint de nustra api -> http://localhost:8080/api/usuarios/?
        this.app.use(this.paths.usuarios, require('../routes/users.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
    }


    listen() {

        this.app.listen(this.port, () => {
            console.log(`\nServidor corriendo en el puerto ${this.port.green} -  http://localhost:${this.port.green}`)
        })

    }
}

module.exports = Server;
