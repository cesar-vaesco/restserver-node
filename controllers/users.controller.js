const { response } = require('express');


const usuariosGet = (req, res = response) => {
    res.json({
        "msg": "get api - controllador"
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
    res.status(400).json({
        "msg": "put api - controllador"
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
