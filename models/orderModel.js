const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const orderProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: { type: String,
      required: true,
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  });
  

  module.exports = mongoose.model('orderProduct', orderProductSchema);