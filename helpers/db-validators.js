//---------------------------IMPORTACIONES---------------------------//

//Importaciones de funsiones ubicadios en otras carpetas

const {
    Category,
    Role,
    Product,
    User,
} = require('../models');


//---------------------------Validadores personalizados de Usuarios---------------------------//

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

//Verificar si el ID del Usuario Existe
const existsIDbyUser = async(id) => {
    const existsIdUser = await User.findById( id );
    if( !existsIdUser ) {
        throw new Error(`El ID ${ id } no existe en los registros`);
    }
}

//---------------------------Validadores personalizados de Categorias---------------------------//

//Verificar si el ID de la Categoria Existe
const existsCategoryByID = async(id) => {
    const existsIdCat = await Category.findById( id );
    if( !existsIdCat ) {
        throw new Error(`El ID ${ id } no existe en los registros`);
    }
}

//---------------------------Validadores personalizados de Productos---------------------------//

//Verificar si el ID de la Categoria Existe
const existsProductByID = async(id) => {
    const existsIdProduct = await Product.findById( id );
    if( !existsIdProduct ) {
        throw new Error(`El ID ${ id } no existe en los registros`);
    }
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    esRolValido,
    emailExists,
    existsIDbyUser,
    existsCategoryByID,
    existsProductByID
}