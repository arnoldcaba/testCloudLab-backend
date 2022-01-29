const jwt = require('jsonwebtoken');

const generateJWT = () => {
    const payload = { hola: 'Cordial Saludo deberias enviar datos de tu usuario' };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_KEY, { 
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log('error in token: ', err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}