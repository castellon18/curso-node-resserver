//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response, json } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

//Importaciones de funsiones ubicadios en otras carpetas
const User = require( '../models/model-usuario' );
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async(req, res = response, next) => {

    const { id_token } = req.body;

    try {
        
        const { nameUser, imageUser, emailUser } = await googleVerify( id_token );

        let user = await User.findOne({ emailUser });
        
        if( !user ) {
            //Tengo que crearlo
            const data = {
                nameUser,
                emailUser,
                passwordUser: '123456',
                rolUser: "USER_ROL",
                imageUser,
                googleUser: true
            };

            user = new User(data);
            await user.save();
        }

        //Si el usuario en BD tiene estado = false
        if( !user.stateUser ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
}


//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    login,
    googleSingIn
};