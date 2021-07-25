const express = require("express"); 
const router = express.Router();
const UsersController = require("../controllers/users.controller")


router.get('/');
    

router.post("/register", UsersController.createUsers);

router.post("/signin",UsersController.getUser);





router.get("/private-task",  (req, res) => {

  

res.json({
    tes:"sisa",
    description:"ies"
})
});







module.exports=router;


