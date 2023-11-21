const { validationResult } = require('express-validator');
const Clientes = require('../models/userModel');
const Producto = require('../models/productModel');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/handleJwt');
const { verifyJWT } = require('../helpers/handleJwt');

const userIndex = (req, res) => {
    res.render('index');
}

const userRegister = (req, res) => {
    res.render('registro');
}

const userCreate = async (req, res) => {

    const errores = validationResult(req)

    const mensajeError = 'Datos Incorrectos';
    const mensajeErrorData = 'Error en la Database';
    const mensajeErrorUser = 'El Usuario ya Existe';

    if (!errores.isEmpty()) {
        console.log('Tenemos un error de validación');
        console.log(errores);
        return res.render('error', {
            mensaje: mensajeError
        });
    }

    //Recibimos los datos
    const { nombre, email, password } = req.body;

    //Testeamos los datos
    console.log(`1. Datos recibidos ${nombre} - ${email} - ${password}`);

    //Intentamos la conexión 
    try {
        //Verificamos si el usuario existe
        let usuarioNuevo = await Clientes.findOne({ email });
        console.log(`2. ${usuarioNuevo}`);

        if (usuarioNuevo) {
            return res.render('error', {
                mensaje: mensajeErrorUser
            })
        }

        //Creamos el usuario 
        usuarioNuevo = new Clientes(req.body);

        //Generamos la encriptación del password del usuario
        const salt = bcrypt.genSaltSync(10);
        console.log(`3. Salt: ${salt}`);

        //password del usuario
        console.log(`4. Password del user: ${usuarioNuevo.password}`);


        usuarioNuevo.password = bcrypt.hashSync(password, salt);

        console.log(`5. Password del user: ${usuarioNuevo.password}`);

        console.log(`6. Usuario Nuevo: ${usuarioNuevo}`);

        //Guardamos el usuario 
        await usuarioNuevo.save();

        return res.render('index', {
            nombre
        });


    } catch (error) {
        console.log('aca llega');
        return res.render('error', {
            mensajeErrorData
        });
    }


}

const logOut = (req, res) => {
    res.clearCookie('token');
    res.render('index');
}

const userLogin = async (req, res) => {
    try {
        const token = req.cookies.token;
        const verifyToken = await verifyJWT(token);
        console.log(`token: ${token}`);
        console.log(`id: ${verifyToken._id}`);
        const userDetail = await Clientes.findById(verifyToken._id)
        console.log(`userDetail: ${userDetail.nombre}`);
        if (userDetail.role === 'admin') {
            return res.render('admin', {
                nombre: userDetail.nombre
            })
        }else{
            return res.render('client', {
                nombre: userDetail.nombre
            })
        }
        
    } catch (e) {
        res.render('login')
    }

} 


    const userValidation = async (req, res) => {

        const { email, password } = req.body;

        console.log(`1. Los datos son: ${email}, ${password}`);

        //Utilizamos la verificación de express-validator
        const errores = validationResult(req);

        const mensajeError = 'Email o Password incorrectos';
        const mensajeErrorData = 'Error en la Database';
        const emailAdmin = 'alexis@alexis.com'

        //Si hay errores
        if (!errores.isEmpty()) {
            console.log('Tenemos un error de validación');
            return res.render('error', {
                mensaje: mensajeError
            });
        }
        console.log('No hay errores');
        try {

            const usuarioLogin = await Clientes.findOne({ email });
            console.log(`2. Usuario Login: ${usuarioLogin}`);

            if (!usuarioLogin) {
                return res.render('login', {
                    mensaje: 'El usuario no existe'
                });
            }

            const validationPass = bcrypt.compareSync(password, usuarioLogin.password);

            console.log(`3. Validación Pass: ${validationPass}`);
            console.log(`id: ${usuarioLogin._id}`);

            console.log(`4. Enviar a pagina de inicio depediendo del rol: ${usuarioLogin.role}`);


            if (validationPass) {
                const token = await generarJWT(usuarioLogin);
                console.log(`5. Token: ${token}`)
                res.cookie('token', token, {
                    httpOnly: true
                })

                if (usuarioLogin.role === 'admin') {
                    return res.render('admin');
                } else {
                    const allProducts = await Producto.find({});
                    return res.render('clientProducts', {
                        title: 'Listado de Productos',
                        products: allProducts,
                    });
                }
            } else {
                return res.render('login', {
                    mensaje: 'La contraseña es incorrecta'
                });
            }


        } catch {
            return res.render('error', {
                mensaje: mensajeErrorData
            });

        }

    }

    const adminMenu = (req, res) => {
        res.render('admin');
    }

    const clientMenu = (req, res) => {
        res.render('client', {
            mensaje: ''
        });
    }


    module.exports = {
        userIndex,
        userRegister,
        userCreate,
        userLogin,
        userValidation,
        adminMenu,
        clientMenu,
        logOut
    }           