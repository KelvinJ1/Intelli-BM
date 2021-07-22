const express = require("express");
const posts = require("../models/posts");
const postsController = require("../models/posts");
const  Post = require("../models/posts")
const router = express.Router();


router.get('/', (req,res)=>{

console.log("api conectada");
res.send('conexió API exitosa')




});




module.exports=router;