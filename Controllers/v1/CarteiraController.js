let Result = require("../../Domain/Entities/Result.js");
const {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, 
        envioMetaCarteiraAtingido, insert} = require("../../Services/v1/CarteiraService.js");



exports.ParametrizaPrecos = (req, res, next) =>{
    var result = new Result();
    var valorPrato = req.params.valor;
    result = insert(valorPrato);
    console.log(result);
    res.status(200).send(result);
}

exports.EnviaEmail = (req, res, next) =>{
    var result = new Result("EnviaEmail", true, 'Email enviado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}