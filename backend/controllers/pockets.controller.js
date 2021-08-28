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
                if(Number(pocket1.saldo)-req.body.valor>=0){
                  pocket1.saldo = Number(pocket1.saldo)-req.body.valor

                  Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                    Pockets.findById(req.body.id2).then((p2)=>{
                      let pocket2 = p2;
                      pocket2.saldo = Number(pocket2.saldo)+req.body.valor
                      Pockets.updateOne({_id:pocket2._id},pocket2).then((rea)=>{
                        res.status(200).json({message:'Actualizacion ejecutada.'})

                      })
                    })

                  })
                }else{
                  res.status(409).json({message:'el valor sobrepasa los fondos en general.'})
                }
              })



            }else{
              Pockets.findById(req.body.id1).then((p1)=>{
                let pocket1 = p1;
                if(Number(pocket1.saldo)-req.body.valor>=0){

                  pocket1.saldo = Number(pocket1.saldo)-req.body.valor
                  Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{

                    res.status(200).json({message:'Actualizacion ejecutada.'})
                  })
                }else{
                  res.status(409).json({message:'el valor sobrepasa los fondos en general.'})
                }
              })

            }

          })


        }

        PocketsController.viaticos= (req,res)=>{
          Pockets.find({duenio:req.userData.userId}).then((pocketsResult)=>{
            if(pocketsResult){

              for(let i =0; i< pocketsResult.length; i++){
                if(pocketsResult[i].name=='VIÁTICOS'){
                  if(pocketsResult[i].saldo-500000>=0){

                    let pocket1 = pocketsResult[i];
                    pocket1.saldo = Number(pocket1.saldo) - 500000;
                    Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{

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
                    })
                  }else{
                    res.status(409).json({message:'el valor a pagar es superior a los fondos en viáticos.'})
                  }
                }
              }
            }

          })

        }

        PocketsController.pagoUsers= (req,res)=>{

          Users.find({rol:req.body.rol}).then((result)=>{
            if(result){
              let listUsers= result;
              let totalAPagar = listUsers.length*2000000;

              Pockets.find({duenio:req.userData.userId}).then((pocketsResult)=>{
                              if(pocketsResult){

                                for(let i =0; i< pocketsResult.length; i++){
                                  if(pocketsResult[i].name=='NÓMINA'){

                                    if(pocketsResult[i].saldo>=totalAPagar){

                                      let pocket1 = pocketsResult[i];
                                      pocket1.saldo = Number(pocket1.saldo) - totalAPagar;
                                      Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{



                                        for(let i = 0; i< listUsers.length;i++){

                                          Pockets.find({duenio:listUsers[i]._id}).then((pocketsResult)=>{
                                            if(pocketsResult){
                                              for(let j =0; j< pocketsResult.length; j++){
                                                if(pocketsResult[j].name=='DISPONIBLE'){
                                                  let pocket1 = pocketsResult[j];
                                                  pocket1.saldo = Number(pocket1.saldo) + 2000000;
                                                  Pockets.updateOne({_id:pocket1._id},pocket1).then((rea)=>{
                                                    console.log('disponible++')


                                                  })
                                                }
                                              }

                                            }
                                          })

                                        }
                                          })

                                      }else{
                                        res.status(409).json({message:'el valor a pagar es superior a los fondos en nomina.'})
                                      }

                                  }
                                }
                              }

                            })
              }
            }).then(()=>{
              res.status(200).json({message:'pago efectuado.'})
            })


        }


        module.exports=PocketsController;
