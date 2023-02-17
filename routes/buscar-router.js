//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { Router } = require( 'express' );
//Importaciones de funsiones ubicadios en otras carpetas
const { buscarParametro } = require('../controllers/buscar-controller');

//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

//Inicializació de la variable router
const router = Router();

//---------------------------ELABORACIONDE RUTAS(END-POINTS) Y VALIDACIONES---------------------------//

//Rutas(endpoint) para las diferentes Peticiones(request)

router.get('/:collection/:params', buscarParametro);

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = router;