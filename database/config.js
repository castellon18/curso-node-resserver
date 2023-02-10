const mongoose = require('mongoose');

const dbConnection = () => {

    try {

        mongoose.set("strictQuery", false);
        
        mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
    } catch (error) {
        console.log(error);
        throw new Error( 'Error al conectarse a la base de datos ' )
    }
}


module.exports = {
    dbConnection
}