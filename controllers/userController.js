const { validationResult } = require('express-validator');



const userIndex = (req, res) => {
    res.render('index');
}

const userRegister = (req, res) => {
    res.render('registro');
}

const userCreate =  (req, res) => {

        const errores = validationResult(req)

        if(!errores.isEmpty()){
            console.log('tenemos un error de validación');
            res.json({errores: errores})
        }

    const { nombre, password, email } = req.body

    console.log(`Datos recibidos ${nombre} - ${password} - ${email} `);

    res.json({
        nombre,
        password,
        email,
    })

} 

const userLogin = (req, res) => {
    res.render('login')
}

const userValidation =(req,res)=>{
    
    let userData = 'alex';
    let passData = '123456';
    
    const { nombre, password} = req.body

    console.log('=========================');
    console.log(`Los datos recibidos son: ${nombre} y ${password}`);
    console.log('=========================');

    if(nombre == 'error' || password == 'error'){
        res.render('error');
    }else if(nombre == userData && password == passData){
        res.render('admin');
    }else if(nombre != userData && password != passData){
        res.render('client');
    }
}


module.exports ={
    userIndex,
    userRegister,
    userCreate,
    userLogin,
    userValidation
}          