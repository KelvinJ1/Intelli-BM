const Pockets = require('../models/pockets');
const jwt = require('jsonwebtoken')

const key = "probando__::5896"

const PocketsController = {}
        // crea un pocket
        PocketsController.createPocket = (req,res)=>{
          const pocketForAdd = new Pockets({
            name: req.body.name,
            saldo: req.body.saldo,
            duenio: req.userData.userId

          });
          pocketForAdd.save().then((createdPocket)=>{
            res.status(201).json({idPocketAdded: createdPocket._id});
          });

        }
        PocketsController.getPockets = (req,res)=>{
          //recoge los pockets del usuario

          Pockets.find().then((pocketsResult)=>{
            if(pocketsResult){
              final=[]

              for(let i = 0; i< pocketsResult.length; i++){
                if(pocketsResult[i].duenio==req.userData.userId){
                  final.push(pocketsResult[i])
                }
              }
              res.status(200).json(final)
            }else{
              res.status(400).json({message:'no encontrado'})
            }
          })
        }

        PocketsController.makeOperation = (req,res)=>{
          const user = Pockets.findById( req.userData.userId)
          if(user.rol=='admin'){
            const pocket1 = Pockets.findById(req.body.id1);
            const pocket2 = Pockets.findById(req.body.id2);
            if(pocket1 && pocket2){
              pocket1.saldo = pocket1.saldo - req.body.valor;
              pocket2.saldo = pocket2.saldo + req.body.valor;
            }
            Pockets.updateOne({_id: pocket1._id},pocket1)
            Pockets.updateOne({_id: pocket2._id},pocket2)
            const final = this.getPockets()
            res.status(200).json(final)
          }else{
            const pocket1 = Pockets.findById(req.body.id1);
            if(pocket1){
              pocket1.saldo = pocket1.saldo - req.body.valor;
            }
            Pockets.updateOne({_id: pocket1._id},pocket1);
            const final = this.getPockets()
            res.status(200).json(final);

          }
        }



        module.exports=PocketsController;


