const path = require('path');

const { v4: uuidv4 } = require('uuid');


const { response } = require("express");
const { readSync } = require('fs');




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
    /* console.log('req.files >>>', req.files); // eslint-disable-line */

    const { archivo } = req.files;

    const nombreCortado = archivo.name.split('.');
    console.log(nombreCortado);

    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar la extención

    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extencionesValidas.includes(extension)) {
        return res.json({ msg: `La extensión ${extension} no es permitida, extensiones validas: ${extencionesValidas}` });
    }

    /* res.json({ extension }); */

    const nombreTemporal = uuidv4() + '.' + extension;


    const uploadPath = path.join(__dirname, '../uploads/', nombreTemporal);

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
