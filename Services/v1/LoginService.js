let Result = require("../../Domain/Entities/Result");
const jwt = require('jsonwebtoken');
const contaSchema = require('../../Domain/Models/v1/ContaModel');
const bcrypt = require("bcryptjs");
const SECRET = 'chavesegurancadetestecucoapi';

async function realizarLogin(email, senha) {
    try {

        const resultado = await autentica({ email, senha });
        var result;
        if (resultado == false) result = new Result(resultado, false, "User not found, or authentication failed", 401);
        else result = new Result(resultado, true, "Acesso autenticado", 200);

        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

const procuraUsuario = async ({ email }) => {
    try {
        var usuario = await contaSchema.findOne({ email: email });
        return usuario;
    } catch (error) {
        return error;
    }
};

const autentica = async ({ email, senha }) => {

    const usuario = await procuraUsuario({ email });
    if (!usuario) return false;

    var autenticaSenha = await bcrypt.compare(senha, usuario.senha);
    if (!autenticaSenha) return false;

    const { _id } = usuario._id;
    const token = jwt.sign(
        {
            userid: _id,
            email, 
            tipoconta: usuario.tipoConta,
            nome: usuario.nome,
            idestabelecimento: usuario.idEstabelecimento
        },
        SECRET,
        {
            expiresIn: 900,
        }
    );

    return ({ token });
};

module.exports = {
    realizarLogin
}

