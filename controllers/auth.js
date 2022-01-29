const {response} = require('express');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const token = await generateJWT();
    console.log(token);
    res.status(200).json({token});
}

const revalidateToken = async(req, res = response) => {
    const { hola } = req;
    try {
        const token = await generateJWT();
        res.status(200).json({token, ok: true});
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Error gerenado el token'});
    }
}
    

module.exports = {
    login,
    revalidateToken
}