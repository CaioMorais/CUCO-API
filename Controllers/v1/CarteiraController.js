let Result = require("../../Domain/Entities/Result");
const {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, 
        envioMetaCarteiraAtingido, inserirCarteira, listagemCarteiras} = require("../../Services/v1/CarteiraService");



exports.InsereCarteira = (req, res, next) =>{
    var result = new Result();

    var metaFinal = req.body.metaFinal;
    var valorAtual = req.body.valorAtual;
    var idRestaurante = req.body.idRestaurante;
    var ong_IdOng = req.body.ong_IdOng;
    var valorPrato = req.body.valorPrato;


    result = inserirCarteira(metaFinal, valorAtual, idRestaurante, ong_IdOng, valorPrato, res);
    console.log(result);
    res.status(200).send(result);
}

exports.ListaCarteira = (req, res, next) =>{
    var listagem = listagemCarteiras();
    console.log(listagem);
    res.status(200).send(listagem);
}



exports.EnviaEmail = (req, res, next) =>{
    var result = new Result("EnviaEmail", true, 'Email enviado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}