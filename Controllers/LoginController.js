let Result = require("../Domain/Entities/Result.js")
exports.teste = (req, res, next) =>{
    result = new Result("teste", true, "testado com sucesso")
    console.log(result)
    res.status(200).send(result)
}