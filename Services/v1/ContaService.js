let Result = require("../../Domain/Entities/Result");
let contaSchema = require('../../Domain/Models/v1/ContaModel');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');

async function cadastrarConta(req){
    
    //Verificação de exixtencia de dados 
    let dadoEmail = await verificaContaExiste(req.body.email);
    let dadoCPF = await verificaCPF(req.body.cpf);
    let dadoCNPJ = await verificaCNPJ(req.body.cnpj);
    if (dadoEmail || dadoCNPJ || dadoCPF){
        var message;

        if (dadoEmail) message = "Cadastro não Efetuado";
        else if (dadoCPF) message = "Cadastro não Efetuado, CPF ja utilizado";
        else message = "Cadastro não Efetuado, CNPJ ja utilizado";

        var result = new Result(null,  false, message, 400);
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

    var result = new Result(contaResult, true, "Conta inserida com sucesso!", 200);
    return result;
}

async function editarConta (idConta, req){
    var conta = await listaContaID(idConta);
    var vetorResult = [];

    vetorResult.push(await estabelecimentoSchema
    .updateOne({_id: conta.idEstabelecimento},{$set:{nomeEstabelecimento: req.body.nomeEstabelecimento, 
                tipoEstabelecimento: req.body.tipoEstabelecimento, cnpj: req.body.cnpj, 
                cidade: req.body.cidade, estado: req.body.estado, endereco: req.body.endereco, 
                emailEstabelecimento: req.body.emailEstabelecimento, 
                contato: req.body.contato}}));

    vetorResult.push(await contaSchema
    .updateOne({_id: idConta}, {$set:{nome: req.body.nome, cpf: req.body.cpf, 
                email: req.body.email, senha: req.body.senha, 
                tipoConta: req.body.tipoConta, idEstabelecimento: req.body.idEstabelecimento,
                dataCadastro: req.body.dataCadastro}}));
    

    var result = new Result(vetorResult, true, "Conta alterada com sucesso!", 200);
    return result;
    
}

async function excluirConta(idConta){
    
    var conta = await listaContaID(idConta);
    var vetorResult = [];

    vetorResult.push(await estabelecimentoSchema.deleteOne({_id: conta.idEstabelecimento}));//remove usuario 
    
    vetorResult.push(await contaSchema.deleteOne({_id: idConta})); //remove estabelecimento

    var result = new Result(vetorResult, true, "Conta excluida com sucesso", 200);
    return result;
}

async function resetarSenha(idConta, req){
    var resultado = await contaSchema.updateOne({_id: idConta},{$set:{senha: req.body.senha}});
    var result;

    if(resultado.acknowledged) result = new Result(resultado, true, "senha atualizada sucesso", 200);
    else result = new Result(resultado, false, "senha não atualizada", 400);

    return result;
}

async function enviaEmailResetSenha(){
    var result = new Result(null, true, "E-mail enviado para o endereço solicitado", 200);
    return result;
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
    return await carteiraSchema.find(); 
}

const listaContaID = async (id) => {
    return await contaSchema
             .findById(id);   
}

module.exports = {
    cadastrarConta, editarConta, excluirConta, resetarSenha, enviaEmailResetSenha
}