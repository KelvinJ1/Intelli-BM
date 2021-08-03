const mongoose=require('mongoose');

const TransactionSchema=mongoose.Schema({
    companyid:{type: String},
    pocketid:{type: String},
    userid:{type: String},
    data:{type: String},
    author:{type: mongoose.Schema.Types.ObjectId,ref:"User", required: true}

// autor, infor, id destinatario, cantida (xpocket)


},
{timestamps: true}

);


  
    module.exports = mongoose.model("Transaction", TransactionSchema)