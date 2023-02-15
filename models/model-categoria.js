//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const {Schema, model} = require('mongoose');

//---------------------------ELABORACION DE FUNSIONES FLECHAS---------------------------//

const CategorySchema = new Schema({

    nameCategory: {
        type: String,
        require: [true, 'El nombre de la Categoria es obligatoria'],
        unique: true
    },
    stateCategory: {
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

CategorySchema.methods.toJSON = function() {
    const{ __v, stateCategory, ...category } = this.toObject();
    return category
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = model( 'Category', CategorySchema );