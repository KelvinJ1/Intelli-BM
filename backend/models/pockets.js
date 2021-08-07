
const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator")
const PocketsSchema = mongoose.Schema({
  name: {type: String},
  saldo:{type: String},
  duenio:{type: mongoose.Schema.Types.ObjectId,ref:'Users', required:true}
}, {timestamps: true});

PocketsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Pockets',PocketsSchema)