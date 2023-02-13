//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const jwt = require( 'jsonwebtoken' );


//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve,  reject ) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '4h' }, ( err, token ) => {
            if( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        } );
    } )
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    generarJWT
};