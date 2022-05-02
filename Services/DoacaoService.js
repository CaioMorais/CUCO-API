function gerarQRCodeLinkDoacao(){

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

}

//Ong Estabelecimento
function validacaoTokens(){
   
}

