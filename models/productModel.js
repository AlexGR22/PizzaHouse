const mongoose = require('mongoose');
const { Schema } = require('mongoose');


// Definición del esquema para el modelo de producto
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    ,
    imageUrl: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Product', productSchema);