//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response, request } = require( 'express' );
const bcrypt = require('bcryptjs');

//Importaciones de funsiones ubicadios en otras carpetas
const User = require( '../models/model-usuario' );

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

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
const postUser = async( req, res = response ) => {
    

    const { nameUser, emailUser, passwordUser, rolUser } = req.body;
    const user = new User( { nameUser, emailUser, passwordUser, rolUser } );

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.passwordUser = bcrypt.hashSync( passwordUser, salt );
    //Guardar en Base de Datos
     await user.save();

    res.json( {
        user
    } );
}

//Metodo PUT para actualizar los Datos
const putUser = async( req, res = response ) => {

    const id = req.params.id
    const {passwordUser, googleUser, ...resto} = req.body;

    //TODO: Validar contra Base de Datos.
    if( passwordUser ) {
        const salt = bcrypt.genSaltSync();
        resto.passwordUser = bcrypt.hashSync( passwordUser, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json( {
        message: 'put API - Controller',
        user
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

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}