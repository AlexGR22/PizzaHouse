const mongoose = require ('mongoose')

const { Schema } = require('mongoose');

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
    }
});


module.exports = mongoose.model('clientes', clienteSchema);  