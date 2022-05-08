let Result = require("../../Domain/Entities/Result");
const {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, 
        envioMetaCarteiraAtingido, insert, listagem} = require("../../Services/v1/CarteiraService");



exports.InsereCarteira = (req, res, next) =>{
    var result = new Result();
    result = insert(req.body);
    console.log(result);
    res.status(200).send(result);
}

exports.ListaCarteira = (req, res, next) =>{
    var listagem = listagem();
    console.log(listagem);
    res.status(200).send(listagem);
}



exports.EnviaEmail = (req, res, next) =>{
    var result = new Result("EnviaEmail", true, 'Email enviado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}