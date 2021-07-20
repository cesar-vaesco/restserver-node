const bcryptjs = require('bcryptjs');
const { response } = require('express');

const generarJWT = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario')

const { googleVerify } = require('../helpers/google-verify');

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
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignin = async (req, res = response) => {

    //Obteniendo el token de google signin
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        //Verificar si el correo xiste en la bd
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Crear usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Validar el estado del usuario
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con administrador - usuario bloqueado'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);
        /* console.log(googleUser); */

        res.json({
            usuario, //token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'Token de google no es valido'
        })

    }

}


module.exports = {
    login,
    googleSignin
}
