const connection = require("../../Infrastructure/Data/connection");
const {novaConta, verificaContaExiste} = require("../../Models/v1/ContaModel");


async function cadastrarConta(nome, email, senha, dataCadastro){
    const usuario = await verificaContaExiste({email});
    if (usuario) return "Cadastro não Efetuado";
    const novoUsuario = await novaConta({nome, email, senha, dataCadastro})
    return novoUsuario;
}


function editarConta(){

}

function excluirConta(){

}

function resetarSenha(){

}

module.exports = {
    cadastrarConta, editarConta, excluirConta, resetarSenha
}