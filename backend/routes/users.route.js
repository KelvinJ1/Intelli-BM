const { Content } = require("@angular/compiler/src/render3/r3_ast");
const { application } = require("express");
const express = require("express"); 
const router = express.Router();
const UsersController = require("../controllers/users.controller")


router.get('/');
    

router.post("/register", UsersController.createUsers);

router.post("/signin",UsersController.getUser);

router.get("/nomina",UsersController.getUsers);

//tareas privadas (autorización)
router.get("/private-task",UsersController.verifyToken, (req, res) => {

res.json({
    tes:"sisa",
    description:"ies"
})

});


router.put("/:id",UsersController.editUser);

router.delete("/:id",UsersController.deleteUser);


module.exports=router;


