const Transaction = require('../models/Transaction');

function pruebaTransaction(req,res){
    res.status(200).send({
        message: 'probando una acción, dentro de contTransactionador Transaction'
    });
}
////////////////////////////////////////////////////////////
//////////////////// CRUD Transaction //////////////////////////
////////////////////////////////////////////////////////////

///// crear ///////
function saveTransaction(req,res){
    console.log("Dentro de funcion saveTransaction ruta /crearTransaction");
    var myTransaction= new Transaction(req.body);
    myTransaction.save((err,result)=>{
    res.status(200).send({message:result});
    });
}

///// buscar ///////
function buscarData(req,res){
    console.log("Dentro de funcion buscarData ruta /buscarTransaction/:id");
    var idTransaction=req.params.id;
    Transaction.findById(idTransaction).exec((err,result)=>{
    if(err){
        res.status(500).send({message:'Error al momento de ejecutar la solicitud'});
    }else{
        if(!result){
            res.status(404).send({message:'El registro a buscar no se encuentra disponible'});
        }else{
            res.status(200).send({result});
        }
    }
    });
}

function listarAllData(req,res){
    console.log("Dentro de funcion listarAllData ruta /buscarTransactionAll/:idb?");
    var idTransaction=req.params.idb;
    if(!idTransaction){
        var result=Transaction.find({}).sort('nombre');
    }else{
        var result=Transaction.find({_id:idTransaction}).sort('nombre');
    }
    result.exec(function(err,result){
    if(err){
        res.status(500).send({message:'Error al momento de ejecutar la solicitud'});
    }else{
        if(!result){
            res.status(404).send({message:'El registro a buscar no se encuentra disponible'});
        }else{
            res.status(200).send({result});
        }
    }
    })
}
 ///////////// Actualizar //////////////////
function updateTransaction(req,res){
    console.log("Dentro de funcion updateTransaction ruta /actualizarTransaction/:id");
    var id = mongoose.Types.ObjectId(req.query.productId);
    Transaction.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, Transaction) {
    if (err)
    res.send(err);
    res.json(Transaction);
    });
    }

////////// Delete ////////////////
function deleteTransaction(req,res){
    console.log("Dentro de funcion deleteTransaction ruta /borrarTransaction/:id");
    var idTransaction=req.params.id;
    Transaction.findByIdAndRemove(idTransaction, function(err, Transaction){
    if(err) {
        return res.json(500, {
        message: 'No hemos encontrado la Transaction'
        })
    }
        return res.json(Transaction)
        });
}


//////////// Exportar funciones contTransactionador Transaction //////////
module.exports={
    pruebaTransaction,
    saveTransaction,
    buscarData,
    listarAllData,
    updateTransaction,
    deleteTransaction
}