//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { Router } = require( 'express' );
const { check } = require('express-validator');

//Importaciones de funsiones ubicadios en otras carpetas
const { login, googleSingIn } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campos-usuario');

//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

//Inicializació de la variable router
const router = Router();

//---------------------------ELABORACIONDE RUTAS(END-POINTS) Y VALIDACIONES---------------------------//

//Rutas(endpoint) para las diferentes Peticiones(request)

router.post('/login', [
    check('emailUser', 'El Correo no es Valido').isEmail(),
    check('passwordUser', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] ,login);

router.post('/google', [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
] ,googleSingIn);

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;