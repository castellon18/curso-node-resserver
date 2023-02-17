//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { Router } = require( 'express' );
const { check } = require('express-validator');

//Importaciones de funsiones ubicadios en otras carpetas
const { validarCampos, validateFileUpload } = require('../middlewares');
const { uploadFile, updateImage, showImage } = require('../controllers/upload-controller');
const { collectionAllowed }       = require( '../helpers' );


//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

//Inicializació de la variable router
const router = Router();

//---------------------------ELABORACIONDE RUTAS(END-POINTS) Y VALIDACIONES---------------------------//

//Rutas(endpoint) para las diferentes Peticiones(request)

router.post( '/', validateFileUpload, uploadFile );

router.put( '/:collection/:id', [
    validateFileUpload,
    check('id', 'El id no es valido').isMongoId(),
    check( 'collection' ).custom( c => collectionAllowed( c, ['usuarios','productos'] ) ),
    validarCampos
], updateImage );

router.get('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check( 'collection' ).custom( c => collectionAllowed( c, ['usuarios','productos'] ) ),
    validarCampos
], showImage );

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;