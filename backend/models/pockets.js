const mongoose = require('mongoose');

const GeneralSchema = mongoose.Schema({

   rol:{type: String},
   name:{type: String},
   password:{type: String},
   phone:{type: String},
   email:{type: String, unique:true},
   accNumber: Number,
   address: String,
   cargo:String,},
{timestamps: true}
);

UsersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", UsersSchema)