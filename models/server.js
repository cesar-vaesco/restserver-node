const express = require('express');
const cors = require('cors');

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middleware
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }


    middlewares() {

        //Cors
        this.app.use(cors());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        //Middleware que configura endpoint de nustra api -> http://localhost:8080/api/usuarios/?
        this.app.use(this.usuariosPath, require('../routes/users.routes'));
    }

    listen() {




        this.app.listen(this.port, () => {
            console.log(`\nServidor corriendo en el puerto ${this.port} -  http://localhost:${this.port}`)
        })

    }
}

module.exports = Server;
