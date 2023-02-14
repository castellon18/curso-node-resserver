const validarCamposUsuario = require( '../middlewares/validar-campos-usuario' );
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {

    ...validarCamposUsuario,
    ...validarJWT,
    ...validarRoles
}