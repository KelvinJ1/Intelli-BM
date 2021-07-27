
const jwt = require("jsonwebtoken");




module.exports= (res,req, next) =>{
    if (!req.headers.authorization){
        return res.status(401).send("unauthorized request")}
    
       const token = req.headers.authorization.split(" ")[1];
     
       if (token ==null)
       return res.status(401).send("unauthorized request")
    
      const payload=  jwt.verify(token, key);
      console.log(payload)
    
      req.userId = payload._id;
      next();
    
    }

