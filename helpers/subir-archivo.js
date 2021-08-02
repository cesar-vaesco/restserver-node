const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        /* console.log(nombreCortado); */
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar la extención
        /*     const extencionesValidas =;    <-- Las extensiones se reciben como un argumento*/
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, extensiones validas: ${extensionesValidas}`);
        }

        /* res.json({ extension }); */

        const nombreTemporal = uuidv4() + '.' + extension;


        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                /* console.log(err);
                return res.status(500).json({ err }); */
                reject(err);
            }

            /* res.json({ msg: 'File uploaded to ' + uploadPath }); */
            resolve(nombreTemporal);
        });
    });


}


module.exports = {
    subirArchivo
}
