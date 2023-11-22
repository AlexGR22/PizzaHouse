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


//Función para crear un nuevo usuario
const userCreate = async (req, res) => {

    // Validación de los datos recibidos
    const errores = validationResult(req)

    // Mensajes de error
    const mensajeError = 'Datos Incorrectos';
    const mensajeErrorData = 'Error en la Database';
    const mensajeErrorUser = 'El Usuario ya Existe';

    // Si hay errores de validación, se renderiza una página de error
    if (!errores.isEmpty()) {
        console.log('Tenemos un error de validación');
        console.log(errores);
        return res.render('error', {
            mensaje: mensajeError
        });
    }

    //Recibimos los datos del formulario
    const { nombre, email, password } = req.body;

    //Analizamos en consola los datos
    console.log(`1. Datos recibidos ${nombre} - ${email} - ${password}`);

    //Intentamos la conexión a la base de datos
    try {
        //Verificamos si el usuario existe en la base de datos
        let usuarioNuevo = await Clientes.findOne({ email });
        console.log(`2. ${usuarioNuevo}`);

        if (usuarioNuevo) {
            return res.render('error', {
                mensaje: mensajeErrorUser
            })
        }

        //Creamos el usuario utlizando el modelo Cientes
        usuarioNuevo = new Clientes(req.body);

        //Generamos la encriptación del password del usuario
        const salt = bcrypt.genSaltSync(10);
        console.log(`3. Salt: ${salt}`);
        
        console.log(`4. Password del user: ${usuarioNuevo.password}`);

        // Encriptamos la contraseña del usuario
        usuarioNuevo.password = bcrypt.hashSync(password, salt);

        console.log(`5. Password del user: ${usuarioNuevo.password}`);

        console.log(`6. Usuario Nuevo: ${usuarioNuevo}`);

        //Guardamos el usuario en la base de datos
        await usuarioNuevo.save();

        // Renderizamos la página de inicio
        return res.render('index', {
            mensaje: 'Usuario Creado Correctamente, Inicia Sesión para realizar tu pedido'
        });


    } catch (error) {
        //En caso de error, renderizamos la página de error
        return res.render('error', {
            mensajeErrorData
        });
    }


}


//Esta función se encarga de cerrar la sesión del usuario. Elimina la cookie del token y renderiza la página de inicio.
const logOut = (req, res) => {
    res.clearCookie('token');
    res.render('index');
}

// Función para el inicio de sesión de un usuario
const userLogin = async (req, res) => {
    try {
        // Obtenemos el token de la cookie
        const token = req.cookies.token;

        // Verificamos el token utilizando la función verifyJWT
        const verifyToken = await verifyJWT(token);

        // Obtenemos los detalles del usuario utilizando el id del token
        const userDetail = await Clientes.findById(verifyToken._id)
        console.log(`el usuario ${userDetail.nombre} se encuentra logeado`);

        // Renderizamos la página de administrador si el rol del usuario es "admin"
        if (userDetail.role === 'admin') {
            return res.render('admin', {
                nombre: userDetail.nombre
            })
        }else{
            // Renderizamos la página de cliente si el rol del usuario no es "admin"
            return res.render('client', {
                nombre: userDetail.nombre
            })
        } 
        
    } catch (e) {
        // Si hay un error, renderizamos la página de inicio de sesión
        res.render('login')
    }

} 

// Función para validar los datos de inicio de sesión de un usuario
    const userValidation = async (req, res) => {

        const { email, password } = req.body;

        console.log(`1. Los datos son: ${email}, ${password}`);

        // Validamos los datos utilizando express-validator
        const errores = validationResult(req);

        const mensajeError = 'Email o Password incorrectos';
        const mensajeErrorData = 'Error en la Database';

        // Si hay errores de validación, renderizamos una página de error
        if (!errores.isEmpty()) {
            console.log('Tenemos un error de validación');
            return res.render('error', {
                mensaje: mensajeError
            });
        }

        try {
             // Buscamos al usuario en la base de datos utilizando el email
            const usuarioLogin = await Clientes.findOne({ email });
            console.log(`2. Usuario Login: ${usuarioLogin.email}`);

            // Si el usuario no existe, renderizamos la página de inicio de sesión con un mensaje de error 
            if (!usuarioLogin) {
                return res.render('login', {
                    mensaje: 'El usuario no existe'
                });
            }

            // Verificamos si la contraseña ingresada coincide con la contraseña almacenada en la base de datos
            const validationPass = bcrypt.compareSync(password, usuarioLogin.password);

            // Si la contraseña es válida, generamos un nuevo token y guardamos la cookie
            if (validationPass) {
                console.log(`usuario: ${usuarioLogin.nombre} rol: ${usuarioLogin.role}, se encuentra logeado`);
                const token = await generarJWT(usuarioLogin);
                res.cookie('token', token, {
                    httpOnly: true
                })
                // Renderizamos la página de administrador si el rol del usuario es "admin"
                if (usuarioLogin.role === 'admin') {
                    return res.render('admin');
                } else {
                    // En caso contrario renderizamos la página de productos para clientes
                    const allProducts = await Producto.find({});
                    return res.render('clientProducts', {
                        title: 'Listado de Productos',
                        products: allProducts,
                        user: usuarioLogin
                    });
                }
            } else {
                // Si la contraseña no es válida, renderizamos la página de inicio de sesión con un mensaje de error
                return res.render('login', {
                    mensaje: 'La contraseña es incorrecta'
                });
            }


        } catch {
            // En caso de error, renderizamos la página de error
            return res.render('error', {
                mensaje: mensajeErrorData
            });

        }

    }

    // Función para renderizar la página de menú de administrador
    const adminMenu = (req, res) => {
        res.render('admin');
    }

    // Función para renderizar la página de menú de cliente
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