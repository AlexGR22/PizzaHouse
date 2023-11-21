const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Definición del esquema para el modelo de  Productos Eliminados
const deletedProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: String,
    description: String,
    deletedAt: {
      type: Date,
      default: Date.now,
    },
  });
  

  module.exports = mongoose.model('DeletedProduct', deletedProductSchema);