const { response, request } = require('express');
const { setNextSequence } = require('../helpers/sequencing');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit = 100 } = req.query;
    try {
        const usuarios = await Usuario.find().limit(Number(limit)).skip(Number(page - 1));
    
        res.status(200).json({
            usuarios,
            page
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Error al obtener los usuarios'
        });
    }
}

const usuariosPost = async(req, res = response) => {
    const { usuario, nombre, apellido, correo } = req.body;
    try {
        // verificar si ya existe el correo
        const existeCorreo = await Usuario.findOne({ correo });
        if (existeCorreo) {
            return res.status(400).json({
                code: 1,
                message: 'El correo ya esta registrado'
            });
        }
    
        // verificar si ya existe el usuario
        const existeUsuario = await Usuario.findOne({ usuario: usuario.toUpperCase() });
        if (existeUsuario) {
            return res.status(400).json({
                code: 2,
                message: 'El usuario ya existe!'
            });
        }
    
        // consecutivo
        const _id = await setNextSequence('userid');
    
        const user = new Usuario({ usuario, nombre, apellido, correo, _id });
        await user.save();
    
        res.status(201).json(user);
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Error al crear el usuario'
        });
    }
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.deleteOne({ _id: id })
        if (!usuario) {
            return res.status(404).json({
                message: 'Error al eliminar el usuario'
            });
        }
        console.log(usuario);
        res.status(200).json({
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Error al eliminar el usuario'
        });
    }
}

const usuariosGetById = async(req, res = response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        console.log(usuario);
        if (!usuario) {
            return res.status(404).json({
                message: 'El usuario no existe'
            });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Error al obtener el usuario'
        });
    }
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosGetById
}