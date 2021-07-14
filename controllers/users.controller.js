const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');


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

const usuariosPost = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existencia
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: "Este correo ya esta registrado"
        })
    }

    //Encriptar - Hash de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Grabar el registro en DB
    await usuario.save();

    res.status(201).json({
        "msg": "post api - controller",
        usuario

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
