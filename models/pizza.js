const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pizzaSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true}, // float
  ingredients: [String]
})

module.exports = mongoose.model('Pizza', pizzaSchema)