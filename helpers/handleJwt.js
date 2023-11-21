const jwt = require('jsonwebtoken');
const CLAVEJWT = process.env.CLAVEJWT;


const generarJWT = async (cliente) => {

    console.log(CLAVEJWT);

    return jwt.sign(
        {
            _id: cliente._id,
            role: cliente.role
        },
        CLAVEJWT,
        {
            expiresIn: '10m'
        }
        );

}

const verifyJWT = async (token) => {
    try {
        return jwt.verify(token, CLAVEJWT);
    } catch (e) {
        // 
        console.log('__Algo fallo___', e)
        return null
    }
} 



module.exports = {
    generarJWT,
    verifyJWT
}