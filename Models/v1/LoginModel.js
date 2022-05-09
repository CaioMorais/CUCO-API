const jwt = require('jsonwebtoken');
const connection = require("../../Infrastructure/Data/connection");
const SECRET = 'chavesegurancadetestecucoapi'

const login = async ({email, senha}) =>{
    const db = await connection();
    const usuario = await db.collection('usuarios').findOne({email, senha});
    return usuario;
};

const autentica = async (req, res) => {
 const {email, senha} = req.body;
 const usuario = await login({email, senha});
 if (!usuario) return res.status(401).json({message: 'User not found'});

 const {_id} = usuario;
 const token =  jwt.sign(
     {
         userid: _id,
         email,
     },
     SECRET,
     {
         expiresIn: 60,
     }
 );

 return res.status(201).json({token});  
};

module.exports = {autentica};