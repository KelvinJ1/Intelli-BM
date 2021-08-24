const Pockets = require('../models/pockets');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const pockets = require('../models/pockets');

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

        PocketsController.viaticos= (req,res)=>{
          Pockets.find({duenio:req.body.id}).then((pocketsResult)=>{
            if(pocketsResult){

              for(let i =0; i< pocketsResult.length; i++){
                if(pocketsResult[i].name=='VIÁTICOS ASIGNADOS'){
                  let pocket1 = pocketsResult[i];
                  pocket1.saldo = Number(pocket1.saldo) + 500000;
                  Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                    res.status(200).json({message:'Actualizacion ejecutada.'})
                  })
                }
              }
            }
          })

          Pockets.find({duenio:req.userData.userId}).then((pocketsResult)=>{
            if(pocketsResult){

              for(let i =0; i< pocketsResult.length; i++){
                if(pocketsResult[i].name=='VIÁTICOS'){
                  let pocket1 = pocketsResult[i];
                  pocket1.saldo = Number(pocket1.saldo) - 500000;
                  Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                    console.log('resta')
                  })
                }
              }
            }

          })

        }

        PocketsController.pagoUsers= (req,res)=>{

          Users.find({rol:req.body.rol}).then((result)=>{
            if(result){
              let listUsers= result;
              let vecesRestar=0;
              for(let i = 0; i< listUsers.length;i++){

                Pockets.find({duenio:listUsers[i]._id}).then((pocketsResult)=>{
                  if(pocketsResult){
                    for(let j =0; j< pocketsResult.length; j++){
                      if(pocketsResult[j].name=='DISPONIBLE'){
                        let pocket1 = pocketsResult[j];
                        pocket1.saldo = Number(pocket1.saldo) + 2000000;
                        vecesRestar++;
                        Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                          console.log('disponible++')

                          Pockets.find({duenio:req.userData.userId}).then((pocketsResult)=>{
                            if(pocketsResult){

                              for(let i =0; i< pocketsResult.length; i++){
                                if(pocketsResult[i].name=='NÓMINA'){

                                  let h =0;
                                  while(h<vecesRestar){

                                    let pocket1 = pocketsResult[i];
                                    pocket1.saldo = Number(pocket1.saldo) - 2000000;
                                    h++;
                                    Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                                        console.log('nomina--')
                                      })
                                    }

                                }
                              }
                            }

                          })

                        })
                      }
                    }

                  }
                })

              }
              }
            }).then((result)=>{
              res.status(200).json({message:'Actualizacion ejecutada.'})
            })


        }


        module.exports=PocketsController;


