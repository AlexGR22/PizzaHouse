const mongoose = require ('mongoose')
require('dotenv').config()


const M_LOCAL= process.env.MONGO_URL_LOCAL; 
const M_ATLAS= process.env.MONGO_URL_ATLAS;


const conexion = mongoose.connect(M_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => {
    console.log('Conexión a la base de datos establecida con éxito');
}).catch(err => console.log(err));


module.exports = conexion;