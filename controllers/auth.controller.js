const bcryptjs = require('bcryptjs');
const { response } = require('express');

const generarJWT = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario')


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - correo'
            })

        }

        //Verificar si el usuario esta activo en la base de datos
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - estado: false'
            })

        }
        //Verificar la contraseña
        const isValidPassword = bcryptjs.compareSync(password, usuario.password);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - password'
            })

        }


        //Generar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable cn el administrador'
        })
    }

}

const googleSignin = (req, res = response) => {

    //Obteniendo el token de google signin
    const { id_token } = req.body;


    res.json({
        msg: 'Todo Ok! google signin',
        id_token
    })
}


module.exports = {
    login,
    googleSignin
}
