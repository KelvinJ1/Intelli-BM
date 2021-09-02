
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Pockets = require('../models/pockets')



const key = "probando__::5896"
//objeto usuario
const UsersController = {}




                //post (crear usuarios)
                UsersController.createUsers = (req,res) =>{
                    bcrypt.hash(req.body.password, 10).then((hash)=>{
                    const newUser = new Users ({
                        rol:req.body.rol,
                        name:req.body.name,
                        password:hash,
                        phone:req.body.phone,
                        email:req.body.email,
                        accNumber:req.body.accNumber,
                        address:req.body.address,
                        cargo: req.body.cargo});
                    newUser.save().then((result)=>{

                      let user =result;

                      if(user.rol=='user'){

                        let pocketForAdd = new Pockets({
                          name: 'DISPONIBLE',
                          saldo: '0',
                          duenio: user._id

                        });
                        pocketForAdd.save().then((createdPocket)=>{
                          console.log('created')
                        });

                        pocketForAdd = new Pockets({
                          name: 'VIÁTICOS ASIGNADOS',
                          saldo: '0',
                          duenio: user._id

                        });
                        pocketForAdd.save().then((createdPocket)=>{
                          console.log('created')
                        });

                      }else if(user.rol=='admin'){

                        let pocketForAdd = new Pockets({
                          name: 'GENERAL',
                          saldo: '0',
                          duenio: user._id

                        });
                        pocketForAdd.save().then((createdPocket)=>{
                          console.log('created')
                        });

                        pocketForAdd = new Pockets({
                          name: 'VIÁTICOS',
                          saldo: '0',
                          duenio: user._id

                        });
                        pocketForAdd.save().then((createdPocket)=>{
                          console.log('created')
                        });

                        pocketForAdd = new Pockets({
                          name: 'NÓMINA',
                          saldo: '0',
                          duenio: user._id

                        });
                        pocketForAdd.save().then((createdPocket)=>{
                          console.log('created')
                        });

                      }
                      res.status(201).json({message:"User created succesfully"})
                    })
                }) };


                //get (trae un usuario para LOGIN)
                UsersController.getUser= (req,res)=>{
                //Se le asignará si el req.user existe
                let userGet;
                Users.findOne({email: req.body.email}).then((user)=>{
                    if (!user) {
                        return  res.status(401).json({message: "Unautohrized, este usuario no existe"});
                    }
                    userGet=user
                    return bcrypt.compare(req.body.password, user.password);
                }).then((result)=>{
                    if (!result){
                        return res.status(401).json({message: "Unauthorized, password does not match"});
                    }
                    //checks in the given email, id, secKey(envVAR),expiration time
                const token=jwt.sign({email:userGet.email, userId: userGet._id, rol: userGet.rol}, key, {expiresIn:"1h"});
                    res.status(200).json({token: token, expiresIn: 3600,rol: userGet.rol});
                    })
                    .catch((err =>{
                        return res.status(401).json({message:"Authentication failed, token error"});
                    }));
                };



                //put (editar usuario)
                UsersController.editUser=(req,res)=>{
                    const user = new Users({_id: req.body.id,
                                            rol: req.body.rol,
                                            name: req.body.name,
                                            password: req.body.password,
                                            phone: req.body.phone,
                                            email: req.body.email,
                                            accNumber: req.body.accNumber,
                                            address: req.body.address
                    })
                    Users.updateOne({_id: user.id},user).then((result)=>{
                      res.status(200).json({message:'Actualizacion ejecutada'})
                    })

                };


                //delete (listar usuarios)
                UsersController.deleteUser=(req,res)=>{

                  Users.deleteOne({_id:req.body.id}).then((result)=>{
                    res.status(200).json({message:'User eliminado'})
                  })

                };


                //listar
                UsersController.getUsers = (req,res)=>{
                    Users.find().then((usersResult)=>{
                        if(usersResult){
                        final=[]
                        for (let i = 0; i < usersResult.length; i++) {
                            if(usersResult[i].rol== 'user' ){
                                final.push(usersResult[i])
                            }
                        }

                        res.status(200).json(final)
                    }else{
                        res.status(400).json({message:'no encontrado'})
                    }
                    })
                    }

                UsersController.getUserEdit = (req,res) =>{
                    Users.findById(req.body.id).then((userResult)=>{
                      if(userResult){
                        res.status(200).json(userResult)
                      }else{
                        res.status(400).json({message:'User no encontrado con el id enviado'});
                      }
                    })
                  }


module.exports= UsersController;