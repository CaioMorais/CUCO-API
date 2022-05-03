
function gerarQRCodeLinkDoacao(){
    // acessar o banco paara retornar o link real com os dados do estabelecimento ja prenchidos
    var link = "www.estabelecimentox/paginadoacao"
    return link
}

function efetuaDoacao(){

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

module.exports = {
    gerarTokenIndentificacaoRetiradaDoacoes,
    gerarQRCodeLinkDoacao, efetuaDoacao, gerarTokenIndentificacaoEntregaDoacoes,
    validacaoTokens, enviarEmailRecompensa
}