const express = require('express')
const cors = require('cors');
const fileUpload = require( 'express-fileupload' );

const { dbConnection } = require('../database/config');

class Server {


    constructor() {

        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            auth:           '/api/auth',
            buscar:         '/api/buscar',
            categoria:      '/api/categorias',
            cargarArchivos:  '/api/upload',
            producto:       '/api/productos',
            user:           '/api/usuarios',
        }

        //Conectar a Base de Datos
        this.conectarDB();
        //Middleware
        this.middleware();
        //Rutas de mi aplicación
        this.routes();

    }

    async conectarDB() {

        await dbConnection();

    }

    middleware() {
        
        //CORS
        this.app.use(cors())
        //Lectura y parseo del body
        this.app.use( express.json() );
        //Directorio Público
        this.app.use( express.static( 'public' ) );
        //Manejo de File Upload o Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }


    routes() {

        this.app.use( this.paths.auth, require( '../routes/auth-routes' ) );
        this.app.use( this.paths.buscar, require( '../routes/buscar-router' ) );
        this.app.use( this.paths.categoria, require( '../routes/categorias-routes' ) );
        this.app.use( this.paths.cargarArchivos, require( '../routes/upload-routers' ) );
        this.app.use( this.paths.producto, require( '../routes/prodcutos-routes' ) );
        this.app.use( this.paths.user, require( '../routes/user-routes' ) );
    }

    listening() {

        this.app.listen( this.port, () => {
            console.log('Servidor Corriendo en Puerto: ', this.port);
        } );
    }

}

module.exports = Server;