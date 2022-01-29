const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');
const { validarCampos } = require('../middlewares/validarcampos');
const { sendFile } = require('express/lib/response');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // conectar a la bd
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // validator de campos
        this.app.use(validarCampos);

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.authPath, require('../routes/auth'));

        // manejo de rutas de app frontend
        /* this.app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        }); */
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
