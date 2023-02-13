//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

//Importaciones de funsiones ubicadios en otras carpetas
const User = require( '../models/model-usuario' );
const { generarJWT } = require('../helpers/generar-jwt');

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

const login = async(req, res = response) => {

    const { emailUser, passwordUser } = req.body;

    try {

        //Verificar si el Email existe
        const user = await User.findOne({ emailUser });
        if( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password, no son correctos - Correo'
            })
        }
        //Usuario esta activo en base de datos
        if( !user.stateUser ) {
            return res.status(400).json({
                msg: 'Usuario / Password, no son correctos - Estado = false'
            })
        }
        //Verificar la contraseña
        const validPassword = bcrypt.compareSync( passwordUser, user.passwordUser );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password, no son correctos - Password'
            })
        }
        //Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Algo salio mal, Consulte con el Administrador'
        })
    }
}


//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = login;