const { Schema, model } = require( 'mongoose' );

const UserSchema = new Schema( { 
    nameUser: {
        type: String,
        required: [true, 'El Nombre es Obligatorio']
    },
    emailUser: {
        type: String,
        required: [true, 'El Correo es Obligatorio'],
        unique: true
    },
    passwordUser: {
        type: String,
        required: [true, 'La Contraseña es Obligatoria']
    },
    imageUser: {
        type: String
    },
    rolUser: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    stateUser: {
        type: Boolean,
        default: true
    },
    googleUser: {
        type: Boolean,
        default: false
    }
} );

module.exports = model( 'Users', UserSchema );