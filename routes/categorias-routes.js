//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { Router } = require( 'express' );
const { check } = require('express-validator');
//Importaciones de funsiones ubicadios en otras carpetas
const { 
    validarCampos,
    validarJWT,
    esAminRol,
    tieneRol
} = require( '../middlewares' );


//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

//Inicializació de la variable router
const router = Router();

//---------------------------ELABORACIONDE RUTAS(END-POINTS) Y VALIDACIONES---------------------------//

//Rutas(endpoint) para las diferentes Peticiones(request)

//Obtener todas las Categorias - publico
router.get( '/', (req, res ) => {
    res.json( 'get Categoria' );
} );

//Obtener Categorias por id - publico
router.get( '/:id', (req, res ) => {
    res.json( 'get Categoria - id' );
} );

//Crear Categorias - privado - solo un usuario con un token valido
router.post( '/', (req, res ) => {
    res.json( 'post Categoria' );
} );

//Actualizar Categorias - privado - solo un usuario con un token valido
router.put( '/:id', (req, res ) => {
    res.json( 'put Categoria - id' );
} );

//Borrar Categorias - privado - solo el Admin
router.delete( '/:id', (req, res ) => {
    res.json( 'delete Categoria - id' );
} );

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;