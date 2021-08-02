
const jwt = require("jsonwebtoken");
const key = "probando__::5896"

module.exports= (res,req, next) =>{

try {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, key);
  next();

} catch (error) {

  return res.status(401).send("Unauthorized request")
  
}


}

