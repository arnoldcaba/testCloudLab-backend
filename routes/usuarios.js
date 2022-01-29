
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosGetById,
        usuariosPatch, } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarToken');

const router = Router();


router.get('/', validarJWT, usuariosGet );
router.get('/:id', validarJWT, usuariosGetById );

router.put('/:id', validarJWT, usuariosPut );

router.post('/', [
    validarJWT,
    check('correo', 'Correo no cumple formato').isEmail(),
    check('usuario', 'Usuario es requerido').not().isEmpty(),
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('apellido', 'Apellido es requerido').not().isEmpty(),
    validarCampos
], usuariosPost );

router.delete('/:id',validarJWT, usuariosDelete );

router.patch('/', validarJWT, usuariosPatch );





module.exports = router;