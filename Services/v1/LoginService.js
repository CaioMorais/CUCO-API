const {autentica} = require("../../Domain/Models/v1/LoginModel");


async function realizarLogin(email, senha){
    const resultado = await autentica({email, senha});
    return resultado;
}

module.exports = {
    realizarLogin
}

