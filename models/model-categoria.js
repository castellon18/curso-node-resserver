//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const {Schema, model} = require('mongoose');

//---------------------------ELABORACION DE FUNSIONES FLECHAS---------------------------//

const CategorySchema = Schema({

    nameCategoria: {
        type: String,
        require: [true, 'El nombre de la Categoria es obligatoria']
    },
    stateCategoria: {
        type: Boolean,
        default: true,
        require: true
    },
    fkUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    }
});

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = model( 'Category', CategorySchema );