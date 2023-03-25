const jwt = require('jsonwebtoken');
const SECRET = 'chavesegurancadetestecucoapi'


function verificaToken(req, res, next) {
   const token = req.headers.authorization;
   console.log(token);
   jwt.verify(token, SECRET, (err) => {
     if (err) {
         return res.status(401).json({message: 'Invalid token'})
     }
     return next();
   })
}

module.exports = {
    verificaToken
}