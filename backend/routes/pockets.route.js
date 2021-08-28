const express = require("express");
const router = express.Router();
const PocketsController = require("../controllers/pockets.controller")
const checkauth = require("../middleware/auth");





router.post("/createPocket",checkauth,PocketsController.createPocket );
router.get("/getPockets",checkauth,PocketsController.getPockets);
router.put("/makeOperation",checkauth,PocketsController.makeOperation);
router.put("/viaticos",checkauth,PocketsController.viaticos);
router.put("/pagoUsers",checkauth,PocketsController.pagoUsers);





module.exports=router;