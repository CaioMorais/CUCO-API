let Result = require("../../Domain/Entities/Result");
const fs = require("fs");
const https = require("https");
const axios = require('axios');

//Insira o caminho de seu certificado .p12 dentro de seu projeto
var certificado = fs.readFileSync("./certificado.p12");

//Insira os valores de suas credenciais em desenvolvimento do pix
var credenciais = {
    client_id: "Client_Id_b6d01b32004025f0cc6d51cef72d2e7fda00c72c",
    client_secret: "Client_Secret_f4a18359309f5d7f5ba78fa8e2f138987d966883",
};

// var data = JSON.stringify({ grant_type: "client_credentials" });
var data_credentials = credenciais.client_id + ":" + credenciais.client_secret;

// Codificando as credenciais em base64
var auth = Buffer.from(data_credentials).toString("base64");

const agent = new https.Agent({
    pfx: certificado,
    passphrase: "",
});

async function gerarCobranca(req) {
    console.log(req)
    let body = {
        calendario: {
          expiracao: 3600
        },
        devedor: {
          cpf: req.cpf,
          nome: req.nome
        },
        valor: {
          original: req.valorDoacao
        },
        chave: req.pixRestaurante,
        solicitacaoPagador: "Doação de " + req.quantidadePratosDoados + " pratos com valor total de " + req.valorDoacao + " reais."
      }
      console.log(body)
    try {
        var token = await getToken();
        console.log(token)
        var config = {
            method: "POST",
            url: "https://api-pix-h.gerencianet.com.br/v2/cob",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
            data: body
        };
        const response = await axios(config);
        return response;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function getToken() {
    //Consumo em desenvolvimento da rota post oauth/token
    var config = {
        method: "POST",
        url: "https://api-pix-h.gerencianet.com.br/oauth/token",
        headers: {
            Authorization: "Basic " + auth,
            "Content-Type": "application/json",
        },
        httpsAgent: agent,
        data: { grant_type: "client_credentials" },
    };
    const response = await axios(config);
    return response.data.access_token;
}

module.exports = {
    gerarCobranca
}