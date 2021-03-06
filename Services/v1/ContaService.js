const bcrypt = require("bcryptjs");
let Result = require("../../Domain/Entities/Result");
let contaSchema = require('../../Domain/Models/v1/ContaModel');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
var nodemailer = require('nodemailer');


async function cadastrarConta(req){
    try {
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
        
        var hash = await bcrypt.hash(req.body.senha, 10);

        var cont = {
            "nome" : req.body.nome,
            "cpf": req.body.cpf,
            "email" : req.body.email,
            "senha" : hash,
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
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

async function editarConta (idConta, req){

    try {

        var conta = await listaContaID(idConta);
        var vetorResult = [];
    
        vetorResult.push(await estabelecimentoSchema
        .updateOne({_id: conta.idEstabelecimento},{$set:{nomeEstabelecimento: req.body.nomeEstabelecimento, 
                    tipoEstabelecimento: req.body.tipoEstabelecimento, cnpj: req.body.cnpj, 
                    cidade: req.body.cidade, estado: req.body.estado, endereco: req.body.endereco, 
                    emailEstabelecimento: req.body.emailEstabelecimento, contato: req.body.contato}
        }));
        
        var hash = await bcrypt.hash(req.body.senha, 10)
        
        vetorResult.push(await contaSchema
        .updateOne({_id: idConta}, {$set:{nome: req.body.nome, cpf: req.body.cpf, 
                    email: req.body.email, senha: hash, 
                    tipoConta: req.body.tipoConta, idEstabelecimento: req.body.idEstabelecimento,
                    dataCadastro: req.body.dataCadastro}
        }));
        
    
        var result = new Result(vetorResult, true, "Conta alterada com sucesso!", 200);
        return result;
         
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

    
}

async function excluirConta(idConta){
    try {

        var conta = await listaContaID(idConta);
        var vetorResult = [];
    
        vetorResult.push(await estabelecimentoSchema.deleteOne({_id: conta.idEstabelecimento}));//remove usuario 
        
        vetorResult.push(await contaSchema.deleteOne({_id: idConta})); //remove estabelecimento
    
        var result = new Result(vetorResult, true, "Conta excluida com sucesso", 200);
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
        var conta = await verificaContaExiste(req.body.email);
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
               pass:"Cuco1234"
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