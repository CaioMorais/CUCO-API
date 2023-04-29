let Result = require("../../Domain/Entities/Result.js");
const { gerarTokenIndentificacaoRetiradaDoacoes,
    /*gerarQRCodeLinkDoacao,*/ cadastraDoacao, enviarEmailRecompensa,
    validacaoTokens, efiCallback } = require("../../Services/v1/DoacaoService");

// exports.QRCodeLinkDoacao = (req, res, next) =>{
//     var id = req.params["id"];
//     var result = gerarQRCodeLinkDoacao(id);
//     console.log(result);
//     res.status(result.status).send(result);
// }

exports.ValidaToken = async (req, res, next) => {
    var id = req.params["idCarteira"];
    var result = await validacaoTokens(id, req);
    console.log(result);
    res.status(200).send(result);
}

exports.GeraTokenRetirada = async (req, res, next) => {
    var id = req.params["idCarteira"];
    var result = await gerarTokenIndentificacaoRetiradaDoacoes(id);
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

exports.efiCallback = async (req, res) => {
    if (req.socket.authorized) {
        console.log("entrou")
        var result = await efiCallback(req.body);
        res.status(result.status).send(result);
        response.status(200).end();
    } else {
        console.log("não entrou")
        var result = await efiCallback(req.body);
        console.log(req.body, result)
        res.status(result.status).send(result);
    }

}
