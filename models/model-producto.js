//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const {Schema, model} = require('mongoose');

//---------------------------ELABORACION DE FUNSIONES FLECHAS---------------------------//

const ProductSchema = new Schema({

    nameProduct: {
        type: String,
        require: [true, 'El nombre de la Categoria es obligatoria'],
        unique: true
    },
    descriptionProduct: {
        type: String
    },
    priceProduct: {
        type: Number,
        default: 0
    },
    fkCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    aviableProduct: {
        type: Boolean,
        default: true
    },
    stateProduct: {
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

ProductSchema.methods.toJSON = function() {
    const{ __v, stateProduct, ...product } = this.toObject();
    return product
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = model( 'Product', ProductSchema );