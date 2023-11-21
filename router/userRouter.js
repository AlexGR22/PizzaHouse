
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



router.get('/', userIndex);

router.get('/registro', userRegister);

router.get('/login', userLogin);

router.get('/admin',checkRoleToken(['admin']), adminMenu);

router.get('/cliente',checkRoleToken(['user','admin']), clientMenu);

router.get('/cerrar',logOut)


router.post('/validation',
    [
        check('password').isLength({ min: 6 }),
        check('email').isEmail()
    ], userValidation)

router.post('/create',
    [
        check('nombre').isLength({ min: 3 }),
        check('password').isLength({ min: 6 }),
        check('email').isEmail(),
    ]
    , userCreate)




module.exports = router; 