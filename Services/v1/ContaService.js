const connection = require("../../Infrastructure/Data/connection");
let Result = require("../../Domain/Entities/Result");
let contaSchema = require('../../Domain/Models/v1/ContaModel');

async function cadastrarConta(req){
    var result = new Result
    const usuario = await verificaContaExiste(req.body.email);
    if (usuario){
        result.content = null;
        result.message = "Cadastro não Efetuado";
        result.success = false;
        return result;
    };
    console.log("Email não encontrado")

    var conta = contaSchema(req.body);

    await conta.save();
    
    result.content = conta;
    result.message = "Conta inserida com sucesso!";
    result.success = true;  
    return result;
}

function editarConta(){

}

function excluirConta(){

}

function resetarSenha(){

}

const verificaContaExiste = async (email) =>{
    let usuario = null;   
    if (email) {
        usuario = await contaSchema
                   .findOne({email: email});
        console.log(usuario);
    }
    return usuario;
}

const listaContas = async () => {
    return await carteiraSchema.find().toArray(); 
}

module.exports = {
    cadastrarConta, editarConta, excluirConta, resetarSenha
}