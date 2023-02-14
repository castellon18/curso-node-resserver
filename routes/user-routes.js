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
const { getUser, putUser, postUser, patchUser, deleteUser } = require('../controllers/user-controller');
const { esRolValido, emailExists, existsIDbyUser } = require('../helpers/db-validators');

//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

//Inicializació de la variable router
const router = Router();

//---------------------------ELABORACIONDE RUTAS(END-POINTS) Y VALIDACIONES---------------------------//

//Rutas(endpoint) para las diferentes Peticiones(request)

router.get('/', getUser);

router.put('/:id', [
    check('id', 'ID no valido').isMongoId(),
    check('id').custom( existsIDbyUser ),
    check('rolUser').custom(esRolValido),
    validarCampos
], putUser);

router.post('/',[
    check('nameUser', 'El nombre es obligatorio').not().isEmpty(),
    check('emailUser', 'El Correo no es Valido').isEmail(),
    check('emailUser').custom(emailExists),
    check('passwordUser', 'Es obligatio y con mas de 6 caracteres').isLength( {min: 6} ),
    //check('rolUser', 'No es un Rol Valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), --Codigo de Ejemplo
    check('rolUser').custom(esRolValido),
    validarCampos

] ,postUser);

router.patch('/', patchUser);

router.delete('/:id',[
    validarJWT,
    //esAminRol,
    tieneRol('ADMIN_ROL', 'SALE_ROL'),
    check('id', 'ID no valido').isMongoId(),
    check('id').custom( existsIDbyUser ),
    validarCampos
], deleteUser);

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;