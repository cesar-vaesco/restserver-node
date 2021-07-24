const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos
} = require('../controllers/productos.controller');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { Producto } = require('../models');


/* const { existeCategoria } = require('../middlewares/validar-categoria'); */



const router = Router();


/* // http://localhost:8080/api/productos */
router.get('/', obtenerProductos);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

//Crear productos - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar registro - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    /* check('categoria', 'No es un id de mongo valido').isMongoId(), */
    /* check('id').custom((value, { req }) => {
        const { nombre } = req.body;

        return Producto.findById(value).then(producto => {
            if (producto) {
                return Promise.reject(`No puedes renombrar la galleta como ${nombre}, ya esta registrada en la base de datos`)
            }
        })
    }), */
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto)

//Borrar Producto - Admin - cualquier persona con un token válido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)



module.exports = router;
