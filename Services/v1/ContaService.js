const connection = require("../../Infrastructure/Data/connection");
const {novaConta, verificaContaExiste} = require("../../Domain/Entities/ContaModel");


async function cadastrarConta(nome, email, senha, dataCadastro){
    const usuario = await verificaContaExiste({email});
    if (usuario) return usuario;
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