const path = require('path');

const { response } = require("express");

const { subirArchivo } = require('../helpers/subir-archivo');


const cargarArchivo = async (req, res = response) => {



    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir.' });
        return;
    }

    /* if (!req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir.' });
        return;
    } */

    //Información del archivo que se esta cargando
    /* console.log('req.files >>>', req.files); // eslint-disable-line */

    const nombre = await subirArchivo(req.files);

    res.json({ nombre });

}


module.exports = {

    cargarArchivo
}
