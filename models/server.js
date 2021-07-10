const express = require('express')

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        //Middleware
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }


    middlewares() {
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World!')
        });
    }

    listen() {




        this.app.listen(this.port, () => {
            console.log(`\nServidor corriendo en el puerto ${this.port} -  http://localhost:${this.port}`)
        })

    }
}

module.exports = Server;
