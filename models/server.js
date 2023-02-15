const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {


    constructor() {

        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            user:       '/api/usuarios',
            categoria:  '/api/categorias',
            producto:  '/api/productos'
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
    }


    routes() {

        this.app.use( this.paths.auth, require( '../routes/auth-routes' ) );
        this.app.use( this.paths.user, require( '../routes/user-routes' ) );
        this.app.use( this.paths.categoria, require( '../routes/categorias-routes' ) );
        this.app.use( this.paths.producto, require( '../routes/prodcutos-routes' ) );
    }

    listening() {

        this.app.listen( this.port, () => {
            console.log('Servidor Corriendo en Puerto: ', this.port);
        } );
    }

}

module.exports = Server;