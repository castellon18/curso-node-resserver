const validarCamposUsuario  = require( './validar-campos' );
const validarJWT            = require('../middlewares/validar-jwt');
const validarRoles          = require('../middlewares/validar-roles');
const validateFileUpload    = require( '../middlewares/validar-archivo-subir' );

module.exports = {

    ...validarCamposUsuario,
    ...validarJWT,
    ...validarRoles,
    ...validateFileUpload
}