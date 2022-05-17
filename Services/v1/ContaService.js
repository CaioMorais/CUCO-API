const connection = require("../../Infrastructure/Data/connection");
let Result = require("../../Domain/Entities/Result");
let contaSchema = require('../../Domain/Models/v1/ContaModel');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');

async function cadastrarConta(req){
    var result = new Result
    let dado = await verificaContaExiste(req.body.email);
    if (dado){
        result.content = null;
        result.message = "Cadastro não Efetuado";
        result.success = false;
        return result;
    };
    dado = await verificaCPF(req.body.cpf);
    if (dado){
        result.content = null;
        result.message = "Cadastro não Efetuado, CPF ja utilizado";
        result.success = false;
        return result;
    };
    dado = await verificaCNPJ(req.body.cnpj);
    if (dado){
        result.content = null;
        result.message = "Cadastro não Efetuado, CNPJ ja utilizado";
        result.success = false;
        return result;
    };

    var estabelecimento = estabelecimentoSchema(req.body);
    await estabelecimento.save();
    
    var conta = contaSchema(req.body);
    await conta.save();

    var contaResult = {
        "nome" : req.body.nome,
        "email": req.body.email,
        "tipoConta" : req.body.tipoConta,
        "nomeEstabelecimento" : req.body.nomeEstabelecimento
    }
    result.content = contaResult;
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
    }
    return usuario;
}

const verificaCPF = async (cpf) =>{
    let usuario = null;   
    if (cpf) {
        usuario = await contaSchema
                   .findOne({cpf: cpf});
    }
    return usuario;
}

const verificaCNPJ = async (cnpj) =>{
    let estabelecimento = null;   
    if (cnpj) {
        estabelecimento = await estabelecimentoSchema
                   .findOne({cnpj: cnpj});
    }
    return estabelecimento;
}

const listaContas = async () => {
    return await carteiraSchema.find().toArray(); 
}

module.exports = {
    cadastrarConta, editarConta, excluirConta, resetarSenha
}