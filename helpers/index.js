


const generarJWT     = require('./generar-jwt');
const dbValidators   = require('./db-validators');
const googleVerify   = require('./google-verify');
const subirArchivo  = require('./subir-archivo');



module.exports = {
    ...generarJWT,
    ...dbValidators,
    ...googleVerify,
    ...subirArchivo
}
