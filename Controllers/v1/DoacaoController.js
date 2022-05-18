let Result = require("../../Domain/Entities/Result.js");
const {gerarTokenIndentificacaoRetiradaDoacoes,
    gerarQRCodeLinkDoacao, cadastraDoacao, enviarEmailRecompensa,
    gerarTokenIndentificacaoEntregaDoacoes,validacaoTokens} = require("../../Services/v1/DoacaoService");

exports.QRCodeLinkDoacao = (req, res, next) =>{
    var result = gerarQRCodeLinkDoacao();
    console.log(result);
    res.status(result.status).send(result);
}

exports.ValidaToken = (req, res, next) =>{
    var result = new Result("ValidaToken", true, 'Token Confirmado com Sucesso');
    console.log(result);
    res.status(200).send(result);
}

exports.GeraTokenRetirada = (req, res, next) =>{
    var result = gerarTokenIndentificacaoRetiradaDoacoes();
    console.log(result);
    res.status(result.status).send(result);
}

exports.GeraTokenEntrega = (req, res, next) =>{
    var result = gerarTokenIndentificacaoEntregaDoacoes();
    console.log(result);
    res.status(result.status).send(result);
}

//deve chamar as duas functions cadastraDoacao e  enviarEmailRecompensa
exports.CadastraDoacao = async (req, res, next) => {
    var idRestaurante = req.params["idRestaurante"];
    var result = await cadastraDoacao(req, idRestaurante);
    console.log(result);
    await enviarEmailRecompensa();
    res.status(result.status).send(result);
}
