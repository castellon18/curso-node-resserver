const { response, request } = require( 'express' );
const User = require( '../models/model-usuario' );

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

const postUser = ( req, res = response ) => {

    const body = req.body;

    const user = new User( body );
    
     user.save( {
        nameUser: body.nameUser,
        emailUser:body.emailUser,
        passwordUser:body.passwordUser,
        rolUser:body.rolUser,
        googleUser:body.googleUser
     } );

    res.json( {
        user
    } );
}

const putUser = ( req, res = response ) => {

    const id = req.params.id

    res.json( {
        message: 'put API - Controller',
        id
    } );
}

const patchUser = ( req, res = response ) => {

    res.json( {
        message: 'patch API - Controller'
    } );
}

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