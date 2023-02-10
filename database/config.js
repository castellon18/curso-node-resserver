require('dotenv').config();
const mongoose = require( 'mongoose' );

const dbConnection = async() => {

    try {

        await mongoose.createConnection(process.env.MONGODB_CNN).asPromise();

        console.log('Conexion Exitosa !!!');
        
    } catch (error) {
        console.log(error);
        throw new Error( 'Error al conectarse a la base de datos ' )
    }
}


module.exports = {
    dbConnection
}