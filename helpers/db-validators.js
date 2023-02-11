//---------------------------IMPORTACIONES---------------------------//

//Importaciones de funsiones ubicadios en otras carpetas
const Role = require('../models/model-role');
const User = require( '../models/model-usuario' );


//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS---------------------------//

const esRolValido = async(rolUser = '') => {
    const existsRol = await Role.findOne({ rolUser });
    if( !existsRol ) {
        throw new Error(`El rol ${ rolUser } no está en la Base de Datos`);
    }
}

//Verificar si el Correo Existe
const emailExists = async(emailUser) => {
    const emailExiste = await User.findOne( { emailUser } );
    if( emailExiste ) {
        throw new Error(`El Email ${ emailUser } ya esta registrado`);
    }
}

//Verificar si el ID Existe
const existsIDbyUser = async(id) => {
    const idUser = await User.findOne( { id } );
    if( idUser ) {
        throw new Error(`El ID ${ idUser } No existe en los registros`);
    }
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    esRolValido,
    emailExists,
    existsIDbyUser
}