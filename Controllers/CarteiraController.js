let Result = require("../Domain/Entities/Result.js");


exports.ParametrizaPrecos = (req, res, next) =>{
    result = new Result("ParametrizaPreco", true, 'Valores cadastrados com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}

exports.EnviaEmail = (req, res, next) =>{
    result = new Result("EnviaEmail", true, 'Email enviado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}