const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');




// http://localhost:8080/api/usuarios/?q=hola&nombre=César&apikey=12345479
const usuariosGet = async (req = request, res = response) => {
    // const { q, nombre, apikey } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    /*     const usuarios = await Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Usuario.countDocuments(query); */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        /* resp */
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar - Hash de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Grabar el registro en DB
    await usuario.save();

    res.status(201).json({
        usuario

    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: Validar contra base de datos
    if (password) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        "msg": "patch api - controller"
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    const uid = req.uid;

    // Fisicamente se borra el registro
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({ usuario, uid });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
