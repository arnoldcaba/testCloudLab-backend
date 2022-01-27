
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosGetById,
        usuariosPatch, } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validarcampos');

const router = Router();


router.get('/', usuariosGet );
router.get('/:id', usuariosGetById );

router.put('/:id', usuariosPut );

router.post('/', [
    check('correo', 'Correo no cumple formato').isEmail(),
    check('usuario', 'Usuario es requerido').not().isEmpty(),
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('apellido', 'Apellido es requerido').not().isEmpty(),
    validarCampos
], usuariosPost );

router.delete('/:id', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;