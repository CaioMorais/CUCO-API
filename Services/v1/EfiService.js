let Result = require("../../Domain/Entities/Result");
const fs = require("fs");
const https = require("https");
const axios = require('axios');

//Insira o caminho de seu certificado .p12 dentro de seu projeto
var certificadoString = "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";

var certificado = Buffer.from(certificadoString, 'base64')

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
    try {
        var token = await getToken();
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