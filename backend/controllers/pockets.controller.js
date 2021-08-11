const Pockets = require('../models/pockets');
const Users = require('../models/users');
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
          Users.findById(req.userData.userId).then((resutl)=>{

            if(resutl.rol=='admin'){


              Pockets.findById(req.body.id1).then((p1)=>{
                let pocket1 = p1;
                pocket1.saldo = Number(pocket1.saldo)-req.body.valor
                Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                  console.log('p1')

                })
              })

              Pockets.findById(req.body.id2).then((p2)=>{
                let pocket2 = p2;
                pocket2.saldo = Number(pocket2.saldo)+req.body.valor
                Pockets.updateOne({_id:pocket2._id},pocket2).then((rea)=>{
                  console.log('p2')

                })
              })
              res.status(200).json({message:'Actualizacion ejecutada.'})

            }else{
              Pockets.findById(req.body.id1).then((p1)=>{
                let pocket1 = p1;
                pocket1.saldo = Number(pocket1.saldo)-req.body.valor
                Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                  console.log(rea)
                })
              })
              res.status(200).json({message:'Actualizacion ejecutada.'})

            }

          })


        }



        module.exports=PocketsController;


