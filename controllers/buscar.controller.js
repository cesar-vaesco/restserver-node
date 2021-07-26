const { response } = require("express");


///api/buscar/coleccion/termino
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    res.json({
        coleccion,
        termino
    })
}



module.exports = {
    buscar
}
