let Result = require("../../Domain/Entities/Result");
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let carteira = require('../../Services/v1/CarteiraService');

function gerarQRCodeLinkDoacao(){
    // acessar o banco paara retornar o link real com os dados do estabelecimento ja prenchidos
    var link = "www.estabelecimentox/paginadoacao"
    return link
}

async function cadastraDoacao(req, idRestaurante){

    await carteira.insereValorCarteira(idRestaurante, req.body.valorDoacao);

    var clienteDoador = clienteDoadorSchema(req.body);
    await clienteDoador.save();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 
    var doa = {
        "valorDoacao:" : req.body.valorDoacao,
        "dataDoacao:": today.toLocaleDateString(),
        "idClienteDoador:" : clienteDoador._id,
        "idRestaurante" : idRestaurante
    }
    console.log(doa);
    var doacao = doacaoSchema(doa);
    await doacao.save();

    var resultDoacao = {
        "nomeDoador" : req.body.nome,
        "valor": req.body.valorDoacao,
    }
    result.content = resultDoacao;
    result.message = "Doacao inserida com sucesso!";
    result.success = true;
    result.status = 200;  
    return result;
}

function enviarEmailRecompensa(){

}

//Ong
function gerarTokenIndentificacaoRetiradaDoacoes(){
    var result = '';
    for (var i = 80; i > 0; --i) {
        result += (Math.floor(Math.random()*256)).toString(16);
    }
    return result;
} 


//Estabelecimento
function gerarTokenIndentificacaoEntregaDoacoes(){
    var result = '';
    for (var i = 80; i > 0; --i) {
        result += (Math.floor(Math.random()*256)).toString(16);
    }
    return result;
}

//Ong Estabelecimento
function validacaoTokens(){
    
}


//Auxiliares 



module.exports = {
    gerarTokenIndentificacaoRetiradaDoacoes,
    gerarQRCodeLinkDoacao, cadastraDoacao, gerarTokenIndentificacaoEntregaDoacoes,
    validacaoTokens, enviarEmailRecompensa
}