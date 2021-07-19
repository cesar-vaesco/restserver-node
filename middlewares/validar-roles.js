const { response } = require('express');

const esAdminRole = (req, res = response, next) => {


    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `401 Unauthorized: ${nombre} no es administrador - Mo puede hacer esto`
        });
    }

    next();
}

const tieneRol = (...roles) => {

    return (req, res, next) => {

        /* console.log(roles, req.usuario.rol); */

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msn:`401 Unauthorized: El servicio requiere uno de estos roles ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}
