const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias.controller');

const { existeCategoriaPorId } = require('../helpers/db-validators');


/* const { existeCategoria } = require('../middlewares/validar-categoria'); */



const router = Router();


/* // http://localhost:8080/api/categorias */

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria)

//Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombres es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar registro - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombres es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], actualizarCategoria)

//Borrar categoria - Admin - cualquier persona con un token válido
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)


module.exports = router;
