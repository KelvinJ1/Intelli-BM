const express= require("express");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");


const key = "probando__::5896"
//objeto usuario
const UsersController = {}


                //get (listar usuarios)
                UsersController.getUsers= (req,res)=>{
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
            

                //get (trae un usuario)
                UsersController.getUser= async(req,res)=>{
                    const {name, password}=req.body;
                    const user =  await Users.findOne({name});

                    if(!user) return res.send("acceso denegado, no se encontró tal usuario");
                    if(user.password !== password) return res.send("wrong password");

                    const token = jwt.sign({_id: user._id}, key);
                    return res.status(200).json({token});                  
                };


              auth();

                //put (editar usuario)
                UsersController.editUser= (req,res)=>{
                };


                //delete (listar usuarios)
                UsersController.deleteUser= (req,res)=>{
                };
                
                
               



module.exports= UsersController;