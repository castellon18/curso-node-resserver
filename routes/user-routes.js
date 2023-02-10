const { Router } = require( 'express' );
const { check } = require('express-validator');
const { getUser, putUser, postUser, patchUser, deleteUser } = require('../controllers/user-controller');

const router = Router();

router.get('/', getUser);

router.put('/:id', putUser);

router.post('/',[
    check('emailUser', 'El Correo no es Valido').isEmail()
] ,postUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

module.exports = router;