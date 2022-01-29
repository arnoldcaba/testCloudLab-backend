const { Router } = require('express');
const { login, revalidateToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validarToken');

const router = Router();

router.post('/login', login);

router.get('/validate', validarJWT, revalidateToken);

module.exports = router;