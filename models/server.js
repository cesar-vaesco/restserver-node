const express = require('express');
const cors = require('cors');

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

        //Cors
        this.app.use(cors());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                "msg": "get api"
            })
        });

        this.app.put('/api', (req, res) => {
            res.status(400).json({
                "msg": "put api"
            })
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                "msg": "post api"
            })
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                "msg": "delete api"
            })
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                "msg": "patch api"
            })
        });
    }

    listen() {




        this.app.listen(this.port, () => {
            console.log(`\nServidor corriendo en el puerto ${this.port} -  http://localhost:${this.port}`)
        })

    }
}

module.exports = Server;
