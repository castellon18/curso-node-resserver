//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const {Schema, model} = require('mongoose');

//---------------------------ELABORACION DE FUNSIONES FLECHAS---------------------------//

const RoleSchema = Schema({

    rol: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = model( 'Role', RoleSchema );