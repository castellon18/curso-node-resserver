const express = require('express')
const cors = require('cors')

class Server {


    constructor() {

        this.app = express()
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';
        //Middleware
        this.middleware();
        //Rutas de mi aplicación
        this.routes();

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

        this.app.use( this.userPath, require( '../routes/user-routes' ) );
    }

    listening() {

        this.app.listen( this.port, () => {
            console.log('Servidor Corriendo en Puerto: ', this.port);
        } );
    }

}

module.exports = Server;