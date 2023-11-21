
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const checkRoleToken = require('../middlewares/roleAuth');
const {
    userIndex,
    userRegister,
    userCreate,
    userLogin,
    userValidation,
    adminMenu,
    clientMenu,
    logOut
} = require('../controllers/userController');


// Ruta para el Home de la pizzería
router.get('/', userIndex);

// Ruta para el registro de usuarios
router.get('/registro', userRegister);

// Ruta para el inicio de sesión de usuarios
router.get('/login', userLogin);

// Ruta para el menú de administrador (solo accesible para usuarios con rol 'admin')
router.get('/admin', checkRoleToken(['admin']), adminMenu);

// Ruta para el menú de cliente (accesible para usuarios con rol 'user' o 'admin')
router.get('/cliente', checkRoleToken(['user', 'admin']), clientMenu);

// Ruta para cerrar sesión
router.get('/cerrar', logOut);

// Ruta para validar el inicio de sesión
router.post('/validation',
    [
        check('password').isLength({ min: 6 }),
        check('email').isEmail()
    ],
    userValidation
);

// Ruta para crear un nuevo usuario
router.post('/create',
    [
        check('nombre').isLength({ min: 3 }),
        check('password').isLength({ min: 6 }),
        check('email').isEmail(),
    ],
    userCreate
);


module.exports = router; 