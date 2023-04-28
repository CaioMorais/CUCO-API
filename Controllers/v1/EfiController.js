const {
    gerarCobranca } = require("../../Services/v1/EfiService");

exports.gerarCobranca = async (req, res, next) => {
    var result = await gerarCobranca(req.body);
    console.log(result);
    res.status(200).send(result);
}