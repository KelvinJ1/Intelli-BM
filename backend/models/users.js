const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({

   rol: String,
   name: String,
   password: String,
   phone: String,
   email: String,
   accNumber: Number,
   address: String,

},

{timestamps: true}

);

module.exports = mongoose.model("Users", UsersSchema)