let Result = require("../../Domain/Entities/Result");
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let carteira = require('../../Services/v1/CarteiraService');
var nodemailer = require('nodemailer');

function gerarQRCodeLinkDoacao(){
    try {

        // acessar o banco paara retornar o link real com os dados do estabelecimento ja prenchidos
        var link = "www.estabelecimentox/paginadoacao"
        var result = new Result(link, true, "link para doaçao", 200);
        return result

    } catch (error) {
      var result = new Result(null, false, "Internal error", 500);
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
      var result = new Result(null, false, "Internal error", 500);
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
function gerarTokenIndentificacaoRetiradaDoacoes(){
    try {

        var resultado = '';
        for (var i = 80; i > 0; --i) {
            resultado += (Math.floor(Math.random()*256)).toString(16);
        }
        var result = new Result(resultado, true, "Token de identificação para retirada de doações", 200);
        return result;
       
    } catch (error) {
      var result = new Result(null, false, "Internal error", 500);
      return result;
    }

} 


//Estabelecimento
function gerarTokenIndentificacaoEntregaDoacoes(){
    try {

        var resultado = '';
        for (var i = 80; i > 0; --i) {
            resultado += (Math.floor(Math.random()*256)).toString(16);
        }
        var result = new Result(resultado, true, "Token de identificação para entrega de doações", 200);
        return result;

    } catch (error) {
      var result = new Result(null, false, "Internal error", 500);
      return result;
    }

}

//Ong Estabelecimento
function validacaoTokens(){
    try {
       
    } catch (error) {
      var result = new Result(null, false, "Internal error", 500);
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