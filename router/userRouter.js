
const express = require('express');
const router= express.Router();
const { check } = require('express-validator');



const{
    userIndex,
    userRegister,
    userCreate,
    userLogin,
    userValidation
} = require('../controllers/userController');

router.get('/', userIndex);

router.get('/registro', userRegister);

router.get('/login', userLogin);


router.post('/validation',userValidation)

router.post('/create',
        [
        check('nombre').isLength({min:3}),
        check('password').isLength({min:6}),
        check('email').isEmail(),
        ]
        , userCreate)




module.exports = router;