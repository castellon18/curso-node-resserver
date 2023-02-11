//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const mongoose = require('mongoose');

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS---------------------------//

const dbConnection = async() => {

    try {

        mongoose.set("strictQuery", false);
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
    } catch (error) {
        console.log(error);
        throw new Error( 'Error al conectarse a la base de datos ' )
    }
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    dbConnection
}