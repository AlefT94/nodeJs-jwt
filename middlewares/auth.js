const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const SECRET = 'segreeeedo'; //usar variável de ambiente

module.exports ={
  verifyJWT: async function (req,res,next){
    const token = req.headers['authorization'].split(" ")
    jwt.verify(token[1], SECRET, (err, decoded)=>{
      if (err) return res.status(401).end();
  
      req.userId = decoded.userId;
      next();
    })
    
  }
}