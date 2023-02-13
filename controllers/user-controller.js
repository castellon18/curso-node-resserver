//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response, request } = require( 'express' );
const bcrypt = require('bcryptjs');

//Importaciones de funsiones ubicadios en otras carpetas
const User = require( '../models/model-usuario' );

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

//Metodo GET para extraer datos de la Base de Datos
const getUser = async( req = request, res = response ) => {

    const query = { stateUser: true };
    const { limite = 5, desde = 0 } = req.query;

    const [ total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(desde)).limit(Number(limite))
    ]);
    
    res.json( {
        total,
        users
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
    const {_id, passwordUser, googleUser, ...resto} = req.body;

    //TODO: Validar contra Base de Datos.
    if( passwordUser ) {
        const salt = bcrypt.genSaltSync();
        resto.passwordUser = bcrypt.hashSync( passwordUser, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json(user);
}

//Metodo Patch
const patchUser = ( req, res = response ) => {

    res.json( {
        message: 'patch API - Controller'
    } );
}

//Metodo DELETE para borrar un registro permanentemente
const deleteUser = async( req, res = response ) => {

    const { id } = req.params

    //Borrar Fisicamente el registro de la base de datos
    //const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, {stateUser: false} );

    res.json( user );
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}