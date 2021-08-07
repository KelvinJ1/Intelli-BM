const { Content } = require("@angular/compiler/src/render3/r3_ast");
const { application } = require("express");
const express = require("express"); 
const router = express.Router();
const UsersController = require("../controllers/users.controller")
const checkauth = require("../middleware/auth");

router.get('/');
    

router.post("/register", UsersController.createUsers);

router.post("/signin",UsersController.getUser);

router.get("/getUsers",UsersController.getUsers);


router.put("/:id",UsersController.editUser);

router.delete("/:id",UsersController.deleteUser);


module.exports=router;


