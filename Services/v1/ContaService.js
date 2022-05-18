let Result = require("../../Domain/Entities/Result");
let contaSchema = require('../../Domain/Models/v1/ContaModel');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');

async function cadastrarConta(req){
    var result = new Result
    
    //Verificação de exixtencia de dados 
    let dadoEmail = await verificaContaExiste(req.body.email);
    let dadoCPF = await verificaCPF(req.body.cpf);
    let dadoCNPJ = await verificaCNPJ(req.body.cnpj);
    if (dadoEmail || dadoCNPJ || dadoCPF){
        result.content = null;
        if (dadoEmail) result.message = "Cadastro não Efetuado";
        else if (dadoCPF) result.message = "Cadastro não Efetuado, CPF ja utilizado";
        else result.message = "Cadastro não Efetuado, CNPJ ja utilizado";
        result.success = false;
        result.status = 400;
        return result;
    };
    
    //Salvando estbelecimento
    var estabelecimento = estabelecimentoSchema(req.body);
    await estabelecimento.save();
    
    //Salvando usuario com id do estabelecimento
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 
    var cont = {
        "nome" : req.body.nome,
        "cpf": req.body.cpf,
        "email" : req.body.email,
        "senha" : req.body.senha,
        "tipoConta" : req.body.tipoConta,
        "idEstabelecimento" : estabelecimento._id,
        "dataCadastro" : today.toLocaleDateString()
    }
    console.log(cont);
    var conta = contaSchema(cont);
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
    result.status = 200;  
    return result;
}

async function editarConta (idConta, req){
    var conta = await listaContaID(idConta);
    console.log(conta.idEstabelecimento);

    await estabelecimentoSchema
    .updateOne({_id: conta.idEstabelecimento},{$set:{nomeEstabelecimento: req.body.nomeEstabelecimento, 
                tipoEstabelecimento: req.body.tipoEstabelecimento, cnpj: req.body.cnpj, 
                cidade: req.body.cidade, estado: req.body.estado, endereco: req.body.endereco, 
                emailEstabelecimento: req.body.emailEstabelecimento, 
                contato: req.body.contato}});

    return await contaSchema
    .updateOne({_id: idConta}, {$set:{nome: req.body.nome, cpf: req.body.cpf, 
                email: req.body.email, senha: req.body.senha, 
                tipoConta: req.body.tipoConta, idEstabelecimento: req.body.idEstabelecimento,
                dataCadastro: req.body.dataCadastro}});
}

async function excluirConta(idConta){
    var conta = await listaContaID(idConta);
    await estabelecimentoSchema.deleteOne({_id: conta.idEstabelecimento});
    //remove usuario 
    return await contaSchema.deleteOne({_id: idConta});  
    //remove estabelecimento
}

function resetarSenha(){

}


///Auxiliares 

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

const listaContaID = async (id) => {
    return await contaSchema
             .findById(id);   
}

module.exports = {
    cadastrarConta, editarConta, excluirConta, resetarSenha
}