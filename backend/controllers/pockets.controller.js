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
          const poke1 = Pockets.findById(req.body.id1);
          const poke2 = Pockets.findById(req.body.id2);
          if(poke1 && poke2){
            poke1.saldo = poke1.saldo - req.body.valor;
            poke2.saldo = poke2.saldo + req.body.valor;
          }
          Pockets.updateOne({_id: poke1._id},poke1)
          Pockets.updateOne({_id: poke2._id},poke2)
          res.status(200).json({message:'Actulizacion completada'})
        }



        module.exports=PocketsController;


