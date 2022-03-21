let Result = require("../Domain/Entities/Result.js");

exports.Editar = (req, res, next) =>{
    result = new Result("Editar", true, 'Cadastro Editado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}

exports.Excluir = (req, res, next) =>{
    result = new Result("Excluir", true, 'Cadastro Excluído com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}

exports.Cadastrar = (req, res, next) =>{
    result = new Result("Cadastrar", true, 'Cadastro Efetuado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}