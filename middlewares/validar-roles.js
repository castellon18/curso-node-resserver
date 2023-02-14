//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response } = require("express")

//Importaciones de funsiones ubicadios en otras carpetas

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

const esAminRol = ( req, res = response, next) => {

    if( !req.user ) {
        return res.status(500).json({
            msg:'Se quiere validar el rol sin antes validar el token'
        });
    }

    const{ rolUser, nameUser } = req.user;
    
    if( rolUser !== 'ADMIN_ROL' ) {
        return res.status(401).json({
            msg:`${nameUser} no es administrador - no puede hacer esto`
        });
    }
    
    next();
}

const tieneRol = ( ...roles ) => {
    return (req, res, next) => {
        
        if( !req.user ) {
        return res.status(500).json({
            msg:'Se quiere validar el rol sin antes validar el token'
        });
    }

    if( !roles.includes( req.user.rolUser ) ) {
        return res.status(404).json({
            msg:`El servicio requiere uno de estos roles ${ roles }`
        });
    }
        next();
    }
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    esAminRol,
    tieneRol
}