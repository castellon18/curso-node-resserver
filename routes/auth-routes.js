//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { Router } = require( 'express' );
const { check } = require('express-validator');

//Importaciones de funsiones ubicadios en otras carpetas
const login = require('../controllers/auth-controller');
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

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;