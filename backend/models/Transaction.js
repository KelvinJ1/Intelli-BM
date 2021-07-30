const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema=Schema({
    companyid:String,
    pocketid:String,
    userid:String,
    data:String
    });

    const Transaction = mongoose.model('Transaction',TransactionSchema);
    module.exports = Transaction;