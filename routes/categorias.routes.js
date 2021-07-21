const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias.controllador');


const { validarJWT, validarCampos } = require('../middlewares');



const router = Router();


/* // http://localhost:8080/api/categorias */

//Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('GET - Todo ok!');
})

//Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('GET POR ID - Todo ok!');
})

//Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombres es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar registro - privado - cualquier persona con un token válido
router.put('/:id', (req, res) => {
    res.json('PUT - Todo ok!');
})

//Borrar categoria - Admin - cualquier persona con un token válido
router.delete('/:id', (req, res) => {
    res.json('DELETE - Todo ok!');
})


module.exports = router;
