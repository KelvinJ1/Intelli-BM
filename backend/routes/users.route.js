const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller")
const checkauth = require("../middleware/auth");

router.get('/');


router.post("/register", UsersController.createUsers);

router.post("/signin",UsersController.getUser);

router.get("/getUsers",UsersController.getUsers);

router.post('/getUserEdit',UsersController.getUserEdit)

router.put("/editUser",checkauth,UsersController.editUser);

router.delete("/deleteUser",checkauth,UsersController.deleteUser);


module.exports=router;


