const { request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'No hay token',
            ok: false
        });
    }
    try {
        const { hola } = jwt.verify(token, process.env.SECRET_JWT_KEY);
        console.log(hola);
        req.hola = 'Cordial Saludo deberias enviar datos de tu usuario. Renewed';
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'Token invalido'});
    }
    next();
}

module.exports = {
    validarJWT
};