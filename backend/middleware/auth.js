const jwt = require("jsonwebtoken");
const key = "probando__::5896"

module.exports= (req,res, next) =>{

try {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, key);
  req.userData={email:decodedToken.email,userId:decodedToken.userId, rol: decodedToken.rol}
  next();

} catch (error) {

  return res.status(401).json({message:"Unauthorized request"})

}


}

