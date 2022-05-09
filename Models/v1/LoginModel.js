const jwt = require('jsonwebtoken');
const connection = require("../../Infrastructure/Data/connection");
const SECRET = 'chavesegurancadetestecucoapi'

const login = async ({email, senha}) =>{
    const db = await connection();
    const usuario = await db.collection('usuarios').findOne({email, senha});
    return usuario;
};

const autentica = async ({email, senha}) => {
 //const {email, senha} = req.body;
 const usuario = await login({email, senha});
 if (!usuario) return 'User not found';

 const {_id} = usuario;
 const token =  jwt.sign(
     {
         userid: _id,
         email,
     },
     SECRET,
     {
         expiresIn: 900,
     }
 );

 return ({token});  
};

module.exports = {autentica};