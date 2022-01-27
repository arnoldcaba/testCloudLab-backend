const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('DB conectada!');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar con la BD!');
  }
}

module.exports = dbConnection;