let Result = require("../../Domain/Entities/Result");
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let carteira = require('../../Services/v1/CarteiraService');
let entregaRetiradasSchema = require('../../Domain/Models/v1/EntregaRetiradaModel');
let historicoEntregaRetiradasSchema = require("../../Domain/Models/v1/HistoricoEntregaRetiradas");
let carteiraSchema = require("../../Domain/Models/v1/CarteiraModel");
let estabelecimentoSchema = require("../../Domain/Models/v1/EstabelecimentoModel");
var nodemailer = require('nodemailer');

function gerarQRCodeLinkDoacao(){
    try {

        // acessar o banco paara retornar o link real com os dados do estabelecimento ja prenchidos
        var link = "www.estabelecimentox/paginadoacao"
        var result = new Result(link, true, "link para doaçao", 200);
        return result

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

}

async function cadastraDoacao(req, idRestaurante){
    try {

        //insere valor carteira
        await carteira.insereValorCarteira(idRestaurante, req.body.valorDoacao);
        
        //Verifica se o cliente ja existe e cria ou atualiza    
        let dadoCPF = await verificaCpfCliente(req.body.cpf);
        if (dadoCPF){
            await clienteDoadorSchema.updateOne({_id: dadoCPF._id},{$set:{nome: req.body.nome, 
                cpf: req.body.cpf, email: req.body.email}});
                var clienteDoador = dadoCPF;
        }
        else{
            var clienteDoador = clienteDoadorSchema(req.body);
            await clienteDoador.save();
        } 

        //Cadastra Doação
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed); 
        var doa = {
            "valorDoacao" : req.body.valorDoacao,
            "dataDoacao": today.toLocaleDateString(),
            "idClienteDoador" : clienteDoador._id,
            "idRestaurante" : idRestaurante
        }
        console.log(doa);
        var doacao = doacaoSchema(doa);
        await doacao.save();

        var resultDoacao = {
            "nomeDoador" : req.body.nome,
            "valor": req.body.valorDoacao,
        }
        
        //envia email com recompensa para cliente
        enviarEmailRecompensa( req.body.email);

        var result = new Result(resultDoacao, true, "Doacao inserida com sucesso!", 200);
        return result;
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

async function enviarEmailRecompensa(emailcliente){
    try {

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
            
            to: emailcliente,
            
            subject: "Obrigado por Doar",
            
            text: "Sua doação ajudara uma pessoa com fome, por esse motivo a equipe do CUCO"+ 
            "em conjunto com o estabelecimento te fornecera um NFC esclusivo, que pode ser resgatado"
            + " pelo link a seguir:  www.nfcexclusivoscucodoadores.com"     
         };
      
      
         remetente.sendMail(emailASerEnviado, function(error){
             if (error) {
                 console.log(error);
             } else {
                 console.log("Email enviado com sucesso.");
             }
         });
       
    } catch (error) {
      return error;
    }
}

//Ong
async function gerarTokenIndentificacaoRetiradaDoacoes(idCarteira){
    try {
        var tokenIdnetificacao = '';
        for (var i = 80; i > 0; --i) {
            tokenIdnetificacao += (Math.floor(Math.random()*256)).toString(16);
        }
        var entregaRetiradasDocument = await entregaRetiradasSchema.findOne({idCarteira: idCarteira});
        console.log(entregaRetiradasDocument);
        await entregaRetiradasSchema.updateOne({_id: entregaRetiradasDocument._id},
            {$set:{tokenOng: tokenIdnetificacao}})
        
        var result = new Result(tokenIdnetificacao, true, "Token de identificação para retirada de doações", 200);
        return result;
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

} 

//Estabelecimento
async function gerarTokenIndentificacaoEntregaDoacoes(idCarteira){
    try {
        var tokenIdnetificacao = '';
        for (var i = 80; i > 0; --i) {
            tokenIdnetificacao += (Math.floor(Math.random()*256)).toString(16);
        }
        var entregaRetiradasDocument = await entregaRetiradasSchema.findOne({idCarteira: idCarteira});
        await entregaRetiradasSchema.updateOne({_id: entregaRetiradasDocument._id},
            {$set:{tokenRestaurante: tokenIdnetificacao}})
        
        var result = new Result(tokenIdnetificacao, true, "Token de identificação para entrega de doações", 200);
        return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

}

//Ong Estabelecimento
async function validacaoTokens(idCarteira, req){
    try {
        var resultado;
        var resultadoHistorico;
        console.log(idCarteira);
        console.log(req.body.tipoConta)
        if(req.body.tipoConta == "ONG"){
            resultado = await entregaRetiradasSchema.findOne({idCarteira: idCarteira, tokenOng: req.body.token});
        }
        else{
            resultado = await entregaRetiradasSchema.findOne({idCarteira: idCarteira, tokenRestaurante: req.body.token});
        }
        
        if(resultado){
            var entregaRetiradasDocument = await entregaRetiradasSchema.findOne({idCarteira: idCarteira});
            if (req.body.tipoConta == "ONG") {           
                await entregaRetiradasSchema.updateOne({_id: entregaRetiradasDocument._id},
                {$set:{verificaTokenOng: "true"}})
            } else {
                await entregaRetiradasSchema.updateOne({_id: entregaRetiradasDocument._id},
                {$set:{verificaTokenRestaurante: "true"}})
            }
            
            entregaRetiradasDocument = await entregaRetiradasSchema.findOne({idCarteira: idCarteira});
            if(entregaRetiradasDocument.verificaTokenOng == "true" && entregaRetiradasDocument.verificaTokenRestaurante == "true"){
                console.log("passou por aqui ")
                await entregaRetiradasSchema.updateOne({_id: entregaRetiradasDocument._id},
                    {$set:{verificaTokenOng: "false", verificaTokenRestaurante: "false",
                    tokenRestaurante: "", tokenOng: ""}})

                const timeElapsed = Date.now();
                const today = new Date(timeElapsed); 
                var ctr = await carteiraSchema.findOne({_id: idCarteira});
                var ong = await estabelecimentoSchema.findOne({_id: ctr.idOng});
                var rest = await estabelecimentoSchema.findOne({_id: ctr.idRestaurante});
                var h = {
                    "idCarteira" : idCarteira,
                    "dataEntregaRetirada" : today.toLocaleDateString(),
                    "valorEntregado" : ctr.metaFinal,
                    "nomeOng" : ong.nomeEstabelecimento,
                    "nomeRestaurante" : rest.nomeEstabelecimento,
                    "idOng" : ong._id,
                    "idRestaurante" : rest._id
                }
                    
                var geraHistoricoEntregaRetirada = historicoEntregaRetiradasSchema(h);
                resultadoHistorico = await geraHistoricoEntregaRetirada.save();
            }

            var result = new Result(resultadoHistorico, true, "Token Validado", 200);
            return result;
        }
        else{
            var result = new Result(resultado, false, "Token não Validado", 400);
            return result;
        }

            
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
    
}

//Auxiliares 
const verificaCpfCliente = async (cpf) =>{
    
    let usuario = null;   
    if (cpf) {
        usuario = await clienteDoadorSchema
                   .findOne({cpf: cpf});
    }
    return usuario;
}

module.exports = {
    gerarTokenIndentificacaoRetiradaDoacoes,
    gerarQRCodeLinkDoacao, cadastraDoacao, gerarTokenIndentificacaoEntregaDoacoes,
    validacaoTokens, enviarEmailRecompensa
}