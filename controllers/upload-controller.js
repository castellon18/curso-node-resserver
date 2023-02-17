//---------------------------IMPORTACIONES---------------------------//
const patch  = require( 'path' );
const fs = require( 'fs' );
//Importaciones de paquetes de dependencias
const { response, request } = require( 'express' );
const { subirArhivo }       = require( '../helpers' );
const { User, Product }     = require( '../models' );

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

const uploadFile = async( req = request, res = response ) => {

    try {
        
        const nameFile = await subirArhivo(req.files, );
        res.status(200).json( {nameFile} );

    } catch ( msg ) {
        res.status(400).json({ msg })
    }

}

const updateImage = async( req = request, res = response ) => {

    const { id, collection } = req.params;

    let modelo;

    switch( collection ) {

        case 'usuarios' :
            modelo = await User.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el ID: ${ id }`
                });
            }
        break;
        case 'productos' :
            modelo = await Product.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el ID: ${ id }`
                });
            }
        break;
        default: 
            return res.status(500).json({msg: 'Se me olvido validar este error'});
        break;
    }

    try {

        //Limpiar Imagenes previas
        if( modelo.image ) {
            //Borrar la imagen del servidor
            const pathImage = patch.join( __dirname, '../uploads', modelo.image );

            if( fs.existsSync( pathImage ) ) {
                fs.unlinkSync( pathImage );
            }
        }

        const nameFile = await subirArhivo(req.files, );
        modelo.image = nameFile;
        await modelo.save();
        res.json( modelo );

    } catch ( msg ) {
        
        res.status(400).json({ msg });

    }

}

const showImage = async( req = request, res = response ) => {

    const { id, collection } = req.params;

    let modelo;

    switch( collection ) {

        case 'usuarios' :
            modelo = await User.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el ID: ${ id }`
                });
            }
        break;
        case 'productos' :
            modelo = await Product.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el ID: ${ id }`
                });
            }
        break;
        default: 
            return res.status(500).json({msg: 'Se me olvido validar este error'});
        break;
    }

    try {

        //Limpiar Imagenes previas
        if( modelo.image ) {
            //Borrar la imagen del servidor
            const pathImage = patch.join( __dirname, '../uploads', modelo.image );

            if( fs.existsSync( pathImage ) ) {
                
                return res.sendFile(pathImage);
            }
        }

        const placeHolder = patch.join( __dirname, '../assets', 'no-image.jpg' );

        res.sendFile( placeHolder );

    } catch ( msg ) {
        
        res.status(400).json({ msg });

    }
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    uploadFile,
    updateImage,
    showImage
};