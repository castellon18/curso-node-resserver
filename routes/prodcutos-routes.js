//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { Router } = require( 'express' );
const { check } = require('express-validator');

//Importaciones de funsiones ubicadios en otras carpetas
const { validarCampos, validarJWT, esAminRol } = require( '../middlewares' );
const { existsProductByID, existsCategoryByID } = require( '../helpers/db-validators' );

const {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/producto-controller');

//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

//Inicializació de la variable router
const router = Router();

//---------------------------ELABORACIONDE RUTAS(END-POINTS) Y VALIDACIONES---------------------------//

//Rutas(endpoint) para las diferentes Peticiones(request)

//Obtener todas los Productos - publico
router.get( '/', obtenerProductos);

//Obtener Producto por id - publico
router.get( '/:id', [
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existsProductByID),
    validarCampos
], obtenerProductoPorId );

//Crear Producto - privado - solo un usuario con un token valido
router.post( '/', [
    validarJWT,
    check('nameProduct', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('fkCategoryId', 'No es un Id Valido').isMongoId(),
    check('fkCategoryId').custom(existsCategoryByID),
    validarCampos
], crearProducto );

//Actualizar Categorias - privado - solo un usuario con un token valido
router.put( '/:id',[
    validarJWT,
    check('id', 'Id no valido').isMongoId(),
    check('nameProduct', 'El nombre del producto es obligatorio'),
    check('id').custom(existsProductByID),
    validarCampos
], actualizarProducto );

//Borrar Categorias - privado - solo el Admin
router.delete( '/:id', [
    validarJWT,
    esAminRol,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existsProductByID),
    validarCampos
], borrarProducto);

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;