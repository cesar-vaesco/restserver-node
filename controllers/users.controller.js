const { response } = require('express');


// http://localhost:8080/api/usuarios/?q=hola&nombre=César&apikey=12345479
const usuariosGet = (req = request, res = response) => {

    const { q, nombre, apikey } = req.query;
    res.json({
        "msg": "get api - controllador",
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        "msg": "post api - controller",
        nombre,
        edad

    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        "msg": "put api - controllador",
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        "msg": "patch api - controller"
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg": "delete api - controller"
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
