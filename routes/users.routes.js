
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/users.controller');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');



const router = Router();



router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de contener más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo ingresado no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);



module.exports = router;


/**
  *El id se le asigna a la ruta que requiere modificar algo usando el id como identificador
  *ejemplo listar por id, borrar, crear
  */
