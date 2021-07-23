const express= require("express");
const Users = require("../models/users");

//objeto usuario
const UsersController = {}


                //get (listar usuarios)
                UsersController.getUsers= (req,res)=>{
                };




                //post (crear usuarios)
                    
                UsersController.createUsers = async(req,res) =>{
                    console.log("post exitoso");
                    res.send('usuario');

                    const{ username, password } = req.body;
                        const newUser = new Users ({ username, password });
                            //metodo asíncrono
                            await  newUser.save();
                };


                //get (trae un usuario)
                UsersController.getUser= (req,res)=>{
                };


                //put (editar usuario)
                UsersController.editUser= (req,res)=>{
                };


                //delete (listar usuarios)
                UsersController.deleteUser= (req,res)=>{
                
                };



module.exports= UsersController;