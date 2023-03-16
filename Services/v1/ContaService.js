const bcrypt = require("bcryptjs");
let Result = require("../../Domain/Entities/Result");
let contaSchema = require('../../Domain/Models/v1/ContaModel');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
var nodemailer = require('nodemailer');


async function cadastrarConta(req){
    try {
        //Verificação a ja exixtencia dos dados 
        var verif = await verificaExistenciaDosDados(req.body)
        console.log(verif, 'teste2');
        if (verif[0] == true){
            var result = new Result(null,  false, verif[1], 400);
            return result;
        }
        else{
                //Salvando estbelecimento
                var estabelecimento = await cadastraEstabelecimento(req.body);
        
                //Salvando usuario com id do estabelecimento
                if (estabelecimento != null) {
                    await cadastraUsuarioComIDEstabelecimento(req.body, estabelecimento._id);
                }
        
                var contaResult = {
                    "nome" : req.body.nome,
                    "email": req.body.email,
                    "tipoConta" : req.body.tipoConta,
                    "nomeEstabelecimento" : req.body.nomeEstabelecimento
                }
        
                var result = new Result(contaResult, true, "Conta inserida com sucesso!", 200);
                return result;
        }
         
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

async function editarConta (idConta, req){
    console.log("editarConta");
    try {

        //Verificação a ja exixtencia dos dados 
        var verif = await verificaExistenciaDosDadosParaEdição(req.body)
        if (verif[0] == true){
            var result = new Result(null,  false, verif[1], 400);
            return result;
        }
        else{

            var contaAtual = await listaContaID(idConta);
            var estabelecimentoAtual = await listaEstabelecimentoOngID(contaAtual.idEstabelecimento);
            var vetorResult = [];
            
            //Atualiza Estabelecimento
            var estabelecimentoAtualizado = await atualizaEstabelecimentoOng(req.body, contaAtual.idEstabelecimento);
    
            if (estabelecimentoAtualizado != null) {
                //Atualiza Conta 
                var contaAtualizada = await atualizaDadosConta(req.body, idConta, estabelecimentoAtual);
            }
            else{
                var result = new Result(error, false, "Alterações não realizadas", 400);
                return result;
            }
            
            if(contaAtualizada != null){
                vetorResult.push(contaAtualizada, estabelecimentoAtualizado);
                var result = new Result(vetorResult, true, "Conta alterada com sucesso!", 200); 
            }
            else{
                var result = new Result(error, false, "Alterações não realizadas", 400);
            }
    
            return result;

        }
        
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
  
}

async function excluirConta(idConta){
    try {

        var contaAtual = await listaContaID(idConta);
        var estabelecimentoAtual = await listaEstabelecimentoOngID(contaAtual.idEstabelecimento);
        var vetorResult = [];
    
        //Exclui Estabelcimento
        var estabelecimentoExcluido = await excluiEstabelecimentoOng(contaAtual.idEstabelecimento);
        if (estabelecimentoExcluido != null) {
            //Exclui Conta
            var contaExcluida = await excluiConta(idConta, estabelecimentoAtual);
        } else {
            var result = new Result(error, false, "Exclusão falhou", 400);
            return result;
        }
        
        if (contaExcluida != null) {
            vetorResult.push(contaExcluida, estabelecimentoExcluido);
            var result = new Result(vetorResult, true, "Conta excluida com sucesso", 200);
        }
        else{
            var result = new Result(error, false, "Exclusão falhou", 400);
        }
        return result;
      
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
    
}

async function pegarDadosConta(idConta){
    try {

        var conta = await listaContaID(idConta);
    
        var result = new Result(conta, true, "", 200);
        return result;
      
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
    
}

async function resetarSenha(idConta, req){
    try {
        var hash = await bcrypt.hash(req.body.senha, 10)
        var resultado = await contaSchema.updateOne({_id: idConta},{$set:{senha: hash}});
        var result;
          
        if(resultado.acknowledged) result = new Result(resultado, true, "senha atualizada sucesso", 200);
        else result = new Result(resultado, false, "senha não atualizada", 400);
    
        return result;
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

}

async function enviaEmailResetSenha(req){ 
    try {
        console.log(req.body.email);
        var conta = await verificaEmailExiste(req.body.email);
        if(!conta){
            var result = new Result(null, false, "Email não enviado, conta inexistente", 400);
            return result; 
        }
        var remetente = nodemailer.createTransport( {
            host: "smtp-mail.outlook.com",
            service: "outlook",
            port: 587,
            secureConnection: false,
            tls: {
              ciphers: 'SSLv3'                            // tls version
            },
            auth: {
               user:"no-reply.cuco@outlook.com.br",
               pass:"Cuco1234@"
            }
         });
      
         var emailASerEnviado = {
      
            from: "no-reply.cuco@outlook.com.br",
            
            to: conta.email,
            
            subject: "Troca de Senha Cuco",
            
            text: "Você solicitou a troca de senha"+
                   " entre no link a seguir para proseguir www.linkpaginatrocadesenha/" + conta._id + ".com ." +
                   " Caso não tenha solicitado ignore esse e-mail e considere trocar sua senha."+
                   " A equipe CUCO está a disposição em caso de qualquer duvida."
                        
         };
      
         remetente.sendMail(emailASerEnviado, function(error){
             if (error) {
                 console.log(error);
             } else {
                 console.log("Email enviado com sucesso.");
             }
         });


         var result = new Result(null, true, "Email enviado com sucesso", 200);
         return result; 
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

}


///-------------------- Metodos Auxiliares --------------------------------

///Verifica se o E-mail existe
const verificaEmailExiste = async (email) =>{
    
    let usuario = null;   
    if (email) {
        usuario = await contaSchema
                   .findOne({email: email});
    }
    return usuario;
}

///Verifica se a CPF existe
const verificaCPF = async (cpf) =>{
    let usuario = null;   
    if (cpf) {
        usuario = await contaSchema
                   .findOne({cpf: cpf});
    }
    return usuario;
}

///Verifica se a CNPJ existe
const verificaCNPJ = async (cnpj) =>{
    let estabelecimento = null;   
    if (cnpj) {
        estabelecimento = await estabelecimentoSchema
                   .findOne({cnpj: cnpj});
    }
    return estabelecimento;
}

///Centraliza se a verificação da já existencias dos dados da nova conta no banco
const verificaExistenciaDosDados = async (body) =>{
    
    var message = null;

    let dadoEmail = await verificaEmailExiste(body.email);
    if (dadoEmail) {
        message = "Cadastro não Efetuado, E-mail ja utilizado";
        return [true, message];  
    }
    
    let dadoCPF = await verificaCPF(body.cpf);
    if (dadoCPF) {
        message = "Cadastro não Efetuado, CPF ja utilizado";
        return [true, message];  
    } 
    
    let dadoCNPJ = await verificaCNPJ(body.cnpj);
    if (dadoCNPJ){
        message = "Cadastro não Efetuado, CNPJ ja utilizado";
        return [true, message];  
    }

    return [false, message];   
}


///Centraliza se a verificação da já existencias dos dados para Edição
const verificaExistenciaDosDadosParaEdição = async (body) =>{
    
    var message = null;
    
    let dadoCPF = await verificaCPF(body.cpf);
    if (dadoCPF) {
        message = "Edição não Efetuado, CPF ja utilizado";
        return [true, message];  
    } 
    
    let dadoCNPJ = await verificaCNPJ(body.cnpj);
    if (dadoCNPJ){
        message = "Edição não Efetuado, CNPJ ja utilizado";
        return [true, message];  
    }

    return [false, message];   
}

//Cadastra Estabelcimento ONG/Restaurante
const cadastraEstabelecimento = async (body) =>{
    try {
        var estabelecimento = estabelecimentoSchema(body);
        await estabelecimento.save();
    } catch (error) {
        return estabelecimento = null;  
    }
    console.log(estabelecimento);
    return estabelecimento;
}

//Cadastra Conta relacionando com Estabelecimento
const cadastraUsuarioComIDEstabelecimento = async (body, estabelecimento_id) =>{
    try {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed); 
        
        var hash = await bcrypt.hash(body.senha, 10);
    
        var cont = {
            "nome" : body.nome,
            "cpf": body.cpf,
            "email" : body.email,
            "senha" : hash,
            "tipoConta" : body.tipoConta,
            "idEstabelecimento" : estabelecimento_id,
            "dataCadastro" : today.toLocaleDateString()
        }
        console.log(cont);
        var conta = contaSchema(cont);
        await conta.save();
    } catch (error) {
        await excluiEstabelecimentoOng(estabelecimento_id);
    }
}

//Atualiza Estabelecimento/ONG
const atualizaEstabelecimentoOng = async (body, idEstabelecimento) =>{
    try {
        var estabelecimentoResult = await estabelecimentoSchema
            .updateOne({_id: idEstabelecimento},{$set:{nomeEstabelecimento: body.nomeEstabelecimento, 
                        tipoEstabelecimento: body.tipoEstabelecimento, cnpj: body.cnpj, 
                        cidade: body.cidade, estado: body.estado, endereco: body.endereco, 
                        emailEstabelecimento: body.emailEstabelecimento, contato: body.contato}
            });
        
        return estabelecimentoResult;
    } catch (error) {
        return estabelecimentoResult = null;
    }
}

//Atualiza DadosConta
const atualizaDadosConta = async (body, idConta, estabelecimentoAtual) =>{
    try {
        var hash = await bcrypt.hash(body.senha, 10)
        
        var contaResult = await contaSchema
        .updateOne({_id: idConta}, {$set:{nome: body.nome, cpf: body.cpf, 
                    email: body.email, senha: hash, 
                    tipoConta: body.tipoConta, idEstabelecimento: body.idEstabelecimento,
                    dataCadastro: body.dataCadastro}
        });

        return contaResult;
    } catch (error) {
        atualizaEstabelcimentoOng(estabelecimentoAtual, estabelecimentoAtual._id);
        return contaResult = null;
    }

}

//Exclui Conta Usuario 
const excluiConta = async (idConta, estabelecimentoAtual) =>{
    try {
        var contaResult = await contaSchema.deleteOne({_id: idConta});
        return contaResult;

    } catch (error) {
        cadastraEstabelcimentoOng(estabelecimentoAtual); //recadadastra o estabelecimento
        return contaResult = null;
    }

}

//Exclui Estabelecimento/Ong
const excluiEstabelecimentoOng = async (idEstabelecimento) =>{
    try {       
        var estabelecimentoResult = await estabelecimentoSchema.deleteOne({_id: idEstabelecimento});
        return estabelecimentoResult;
    } catch (error) {
        return estabelecimentoResult = null;
    }

}

//Lista Contas
const listaContas = async () => {
    return await carteiraSchema.find(); 
}

//Lista conta por ID
const listaContaID = async (id) => {
    return await contaSchema
             .findById(id);   
}

//Lista estabelecimento por ID
const listaEstabelecimentoOngID = async (id) => {
    return await estabelecimentoSchema
             .findById(id);   
}

module.exports = {
    cadastrarConta, editarConta, excluirConta, resetarSenha, enviaEmailResetSenha, pegarDadosConta
}