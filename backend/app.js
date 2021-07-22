const express = require("express");

//import cors
const cors = require("cors");
//import ORM
const mongoose=require("mongoose")

const Post= require("./models/posts")


const app = express();
const PostRoute = require("./routes/posts.route");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());



// conexión a la DB
mongoose.connect(
  "mongodb+srv://admin:MjGTXss8vqhQmqqS@cluster0.1feml.mongodb.net/IntelliDB?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true}
  ).then(()=>{
    console.log("Conexión exitosa a DB")

  }).catch(()=>{

    console.log("Error en conexion a DB")
  });


//RUTAS
app.use("/api/posts", PostRoute )




  
/*
app.get('/', (req, res) => {
    res.send('Hello World!')
    
  })


app.get('/login', (req, res) => {
    res.send( "login" )
  

  })


  app.get('/general', (req, res) => {
    res.send( "general" )


  }) 


  app.get('/monitoring', (req, res) => {
    res.send( "monitoring" )
  })


  app.get('/budgetAdm', (req, res) => {
    res.send( "admin presupuesto" )
  })

  app.get('/payroll', (req, res) => {
    res.send( "nomina" )
  })

  app.get('/UserLogin', (req, res) => {
    res.send( "login usuario" )
  })
*/







module.exports = app;