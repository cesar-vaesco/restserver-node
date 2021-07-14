
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/users.controller');

const router = Router();



router.get('/', usuariosGet);

router.post('/',
    [check('correo', 'El correo ingresado no es valido').isEmail()],
    usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);



module.exports = router;


/**
  *El id se le asigna a la ruta que requiere modificar algo usando el id como identificador
  *ejemplo listar por id, borrar, crear
  */
