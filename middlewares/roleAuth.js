const { verifyJWT } = require('../helpers/handleJwt')
const userModel = require('../models/userModel')


const checkRole = (roles) => async (req, res, next) => {
    try {
      
        const token = req.cookies.token;
        const verifyToken = await verifyJWT(token);
        
        console.log(`el token es esteee ${verifyToken}`);

        if (!verifyToken) {
            res.clearCookie('token');
            res.render('login', { mensaje: 'Su sesión ha caducado, vuelva a loguearse' }) 
        } else {
            const userDetail = await userModel.findById(verifyToken._id)
            req.user = userDetail;
            const { role } = userDetail
            console.log(`el rol es ${role}`);
            if ([].concat(roles).includes(role)) {
                next()
            } else {
                res.status(409)
                res.render('error', { mensaje: 'Usted no cuenta con los permisos suficientes para acceder a esta página' })
            }
        }
    } catch (e) {
        console.log('___Error auth___')
        res.status(409)
        res.send({ error: 'Algo sucedio en el middleware roleAuth' })
    }
}


module.exports = checkRole 