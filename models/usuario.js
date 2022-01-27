const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
  usuario: {
    type: String,
    required: [true, 'El usuario es requerido']
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido']
  },
  correo: {
    type: String,
    required: [true, 'El correo es requerido'],
    unique: true
  },
  _id: {
    type: Number
  }
});

module.exports = model('Usuario', UsuarioSchema);