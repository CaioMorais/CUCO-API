let Result = require("../../Domain/Entities/Result");
const jwt = require('jsonwebtoken');
const usuarioSchema = require('../../Domain/Models/v1/ContaModel');
const bcrypt = require("bcryptjs");
const SECRET = 'chavesegurancadetestecucoapi';

async function realizarLogin(email, senha){
    const resultado = await autentica({email, senha});
    var result;
    if (resultado == false) result = new Result(resultado, false, "User not found, or authentication failed", 401);
    else result = new Result(resultado, true, "Acesso autenticado", 200);

    return result;
}

const procuraUsuario = async ({email}) =>{
    var usuario = await usuarioSchema
    .findOne({email: email});
    return usuario;
};

const autentica = async ({email, senha}) => {

 const usuario = await procuraUsuario({email});
 if (!usuario) return false;

 var autenticaSenha = await bcrypt.compare(senha, usuario.senha);
 if (!autenticaSenha) return false;

 const {_id} = usuario;
 const token = jwt.sign(
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

module.exports = {
    realizarLogin
}

