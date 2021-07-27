
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Content } = require("@angular/compiler/src/render3/r3_ast");
const { Type } = require("@angular/compiler/src/core");
const { application, json } = require("express");
const users = require("../models/users");

const key = "probando__::5896"
//objeto usuario
const UsersController = {}


                //get (listar usuarios)
                UsersController.getUsers= async(req,res)=>{

                   const mostrar= await  Users.find()
                   res.send(mostrar)


                };

                //post (crear usuarios)
                    
                UsersController.createUsers = async(req,res) =>{
                    console.log("post exitoso");
                    res.send('usuario creado'); 
                    const {rol,name,password,phone,email,accNumber
                        ,address}  = req.body;
                    const newUser = new Users ({rol,name,password,phone,email,accNumber,address});
                //metodo asíncrono
                await newUser.save();    
                const token =  jwt.sign({_id: newUser._id}, key)
                res.status(200).json({token})
                };
            

                //get (trae un usuario para login)
                UsersController.getUser= async(req,res)=>{
                    const {name, password}=req.body;
                    const user =  await Users.findOne({name});

                    if(!user) return res.send("acceso denegado, no se encontró tal usuario");
                    if(user.password !== password) return res.send("wrong password");

                    const token = jwt.sign({_id: user._id}, key);
                    return res.status(200).json({token});                  
                };              
                //put (editar usuario)
                UsersController.editUser= async(req,res)=>{

                    //encunetra usuario por el Id y edita los campos enviados en el body

                await Users.findByIdAndUpdate(req.params._id, req.body);         

                    res.status(200).json("Usuario actualizado")

            
                };


                //delete (listar usuarios)
                UsersController.deleteUser= async(req,res)=>{

                    await Users.findOneAndDelete(req.params._id);
                    res.json({status: "usuario eliminado"})


                };                                        

                  //autenticación (middleware)
                UsersController.verifyToken = (req,res, next) => {                  
                    if (!req.headers.authorization)
                    return res.status(401).send("unauthorized request");
                    
                        const token = req.headers.authorization.split(" ")[1];                 
                        if (token == null)
                        return res.status(401).send("unauthorized request");
                    
                        const payload =  jwt.verify(token, key);
                        console.log(payload);
                    
                        req.userId = payload._id;
                        next();
                    
                }       



module.exports= UsersController;