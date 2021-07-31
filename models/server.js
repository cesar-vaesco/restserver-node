const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload')

require('colors');

const { dbConnection } = require('../databases/config.db');

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:        '/api/auth',
            buscar:      '/api/buscar',
            categorias:  '/api/categorias',
            productos:   '/api/productos',
            usuarios:    '/api/usuarios',
            uploads:     '/api/uploads',
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

        //Carga de archivos - uploads
        this.app.use(fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }


    routes() {

        //Middleware que configura endpoint de nustra api -> http://localhost:8080/api/?/?
        this.app.use(this.paths.auth,       require('../routes/auth.routes.js'));
        this.app.use(this.paths.buscar,     require('../routes/buscar.routes'));
        this.app.use(this.paths.usuarios,   require('../routes/users.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos,  require('../routes/productos.routes'));
        this.app.use(this.paths.uploads,    require('../routes/uploads.routes'));
    }


    listen() {

        this.app.listen(this.port, () => {
            console.log(`\nServidor corriendo en el puerto ${this.port.green} -  http://localhost:${this.port.green}`)
        })

    }
}

module.exports = Server;
