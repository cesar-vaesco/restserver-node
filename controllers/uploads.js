const path = require('path');

const { response } = require("express");




const cargarArchivo = (req, res = response) => {



    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir.' });
        return;
    }

    /* if (!req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir.' });
        return;
    } */

    //Información del archivo que se esta cargando
    console.log('req.files >>>', req.files); // eslint-disable-line

    const { archivo } = req.files;

    const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ err });
        }

        res.json({ msg: 'File uploaded to ' + uploadPath });
    });

}


module.exports = {

    cargarArchivo
}
