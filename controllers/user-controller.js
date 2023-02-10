const { response, request } = require( 'express' );
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require( '../models/model-usuario' );

//Metodo GET para extraer datos de la Base de Datos
const getUser = ( req = request, res = response ) => {

    const { q, nombre = 'no mane', apikey, page, limit } = req.query;

    res.json( {
        message: 'get API - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    } );
}

//Metodo POST para registrar en la Base de Datos
const postUser = ( req, res = response ) => {
    
    //Validar si es un correo
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {

        return res.status(400).json( errors );
    }

    const { nameUser, emailUser, passwordUser, rolUser } = req.body;
    const user = new User( { nameUser, emailUser, passwordUser, rolUser } );

    //Verificar si el Correo Existe
    const emailExiste = User.findOne( { emailUser } );
    if( emailExiste ) {
        return res.status(400).json({
            message: 'Este Correo ya esta registrado'
        });
    }
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.passwordUser = bcrypt.hashSync( passwordUser, salt );
    //Guardar en Base de Datos
     user.save();

    res.json( {
        user
    } );
}

//Metodo PUT
const putUser = ( req, res = response ) => {

    const id = req.params.id

    res.json( {
        message: 'put API - Controller',
        id
    } );
}

//Metodo Patch
const patchUser = ( req, res = response ) => {

    res.json( {
        message: 'patch API - Controller'
    } );
}

//Metodo DELETE para borrar un registro permanentemente
const deleteUser = ( req, res = response ) => {

    res.json( {
        message: 'delete API - Controller'
    } );
}

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}