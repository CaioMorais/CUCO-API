const jwt = require('jsonwebtoken');
const usuarioSchema = require('../../Domain/Models/v1/ContaModel');
const SECRET = 'chavesegurancadetestecucoapi'

const procuraUsuario = async ({email, senha}) =>{
    usuario = await usuarioSchema
    .findOne({email: email, senha: senha});
    return usuario;
};

const autentica = async ({email, senha}) => {
 //const {email, senha} = req.body;
 const usuario = await procuraUsuario({email, senha});
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

async function realizarLogin(email, senha){
    const resultado = await autentica({email, senha});
    return resultado;
}

module.exports = {
    realizarLogin
}

