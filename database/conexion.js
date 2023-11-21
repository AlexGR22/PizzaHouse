const mongoose = require ('mongoose')
require('dotenv').config()


// Obtener las URL de conexión a la base de datos desde las variables de entorno
const M_LOCAL= process.env.MONGO_URL_LOCAL; 
const M_ATLAS= process.env.MONGO_URL_ATLAS;


// Establecer la conexión a la base de datos
const conexion = mongoose.connect(M_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => {
    console.log('Conexión a la base de datos establecida con éxito');
}).catch(err => console.log(err));


module.exports = conexion;