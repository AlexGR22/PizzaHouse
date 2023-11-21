const mongoose = require('mongoose');
const { Schema } = require('mongoose');


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