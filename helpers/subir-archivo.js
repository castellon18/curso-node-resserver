const path = require( 'path' );
const { uuid } = require('uuidv4');


const extencionesValidas = [ 'png', 'jpg', 'jpeg', 'gif', 'txt', 'xlsx', 'docx' ]

const subirArhivo = ( files, folderName = '' ) => {

    return new Promise( ( resolve, reject ) => { 

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        //validar la extension:
        if( !extencionesValidas.includes( extension ) ) {
            return reject( `La extension ${ extension } no es permitida - ${ extencionesValidas }` );
        }

        const temporalName = uuid() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folderName ,temporalName ) ;

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject( err );
            }

            resolve( temporalName );
        });

    } );
}

module.exports = {
    subirArhivo
}