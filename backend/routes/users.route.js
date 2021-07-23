const express = require("express"); 
const router = express.Router();
const UsersController = require("../controllers/users.controller")


router.get('/');
    

router.post("/register", UsersController.createUsers);




module.exports=router;