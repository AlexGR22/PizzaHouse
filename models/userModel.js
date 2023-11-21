const mongoose = require ('mongoose')

const { Schema } = require('mongoose');

// Definición del esquema para el modelo de cliente
const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});


module.exports = mongoose.model('clientes', clienteSchema);  



