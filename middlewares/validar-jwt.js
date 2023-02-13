//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response, request } = require('express');
const jwt = require( 'jsonwebtoken' );

//Importaciones de funsiones ubicadios en otras carpetas
const User = require( '../models/model-usuario' );

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

const validarJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');
    if( !token ) {
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        //Leer el usuario que corresponde a la uid
        const user = await User.findById( uid );
        if( !user ){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe en BD'
            })
        }
        //Verificar si el uid del usuario tiene el estado en true
        if( !user.stateUser ){
            return res.status(401).json({
                msg:'Token no valido - Usuario con estado en false'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido'
        })
        
    }
}



//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    validarJWT
}