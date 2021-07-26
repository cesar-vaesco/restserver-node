const { response } = require("express");
const { ObjectId } = require("mongoose").Types;


const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'categoria',
    'productos',
    'roles',
    'usuarios',
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results: usuario ? [usuario] : []
        })
    }
}


///api/buscar/coleccion/termino
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {


        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categoria':
            break;
        case 'productos':
            break;

        default:
            res.status(500).json({
                msg: ' Se le olvido hacer esta busqueda'
            })
            break;
    }

}



module.exports = {
    buscar
}
