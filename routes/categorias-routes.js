//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { Router } = require( 'express' );
const { check } = require('express-validator');

//Importaciones de funsiones ubicadios en otras carpetas
const { validarCampos, validarJWT } = require( '../middlewares' );
const { existsCategoryByID } = require( '../helpers/db-validators' );

const {
    crearCategotia,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categoria-controller');

//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

//Inicializació de la variable router
const router = Router();

//---------------------------ELABORACIONDE RUTAS(END-POINTS) Y VALIDACIONES---------------------------//

//Rutas(endpoint) para las diferentes Peticiones(request)

//Obtener todas las Categorias - publico
router.get( '/', obtenerCategorias);

//Obtener Categorias por id - publico
router.get( '/:id', [
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existsCategoryByID),
    validarCampos
], obtenerCategoriaPorId );

//Crear Categorias - privado - solo un usuario con un token valido
router.post( '/', [
    validarJWT,
    check('nameCategory', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategotia );

//Actualizar Categorias - privado - solo un usuario con un token valido
router.put( '/:id',[
    validarJWT,
    check('nameCategory', 'El nombre de la Categoria es Obligatorio'),
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existsCategoryByID),
    validarCampos
], actualizarCategoria );

//Borrar Categorias - privado - solo el Admin
router.delete( '/:id', [
    validarJWT,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existsCategoryByID),
    validarCampos
], borrarCategoria);

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;