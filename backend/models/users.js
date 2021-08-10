const mongoose = require('mongoose');
const uniqueValidator= require("mongoose-unique-validator")
const UsersSchema = mongoose.Schema({

   rol:{type: String},
   name:{type: String},
   password:{type: String},
   phone:{type: String},
   email:{type: String, unique:true},
   accNumber: Number,
   address: String,
   },
{timestamps: true}
);

UsersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", UsersSchema)
