const {realizarLogin} = require("../../Services/v1/LoginService")
 
exports.autenticar = async (req, res) =>{
    const email =  req.body.email;
    const senha =  req.body.senha;
    const result = await realizarLogin(email, senha);
    res.status(result.status).send(result)
}



