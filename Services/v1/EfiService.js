let Result = require("../../Domain/Entities/Result");
const fs = require("fs");
const https = require("https");
const axios = require('axios');

//Insira o caminho de seu certificado .p12 dentro de seu projeto
//ACP
var certificadoString = "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";
//PRD
// var certificadoString = "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"

var certificado = Buffer.from(certificadoString, 'base64')

//Insira os valores de suas credenciais em desenvolvimento do pix
//ACP
var credenciais = {
    client_id: "Client_Id_b6d01b32004025f0cc6d51cef72d2e7fda00c72c",
    client_secret: "Client_Secret_f4a18359309f5d7f5ba78fa8e2f138987d966883",
};

//PRD
// var credenciais = {
//     client_id: "Client_Id_91bb7f370448562840828a900a0c6c037a62cd8a",
//     client_secret: "Client_Secret_4b51d8909ae09daf00f4227d4116116b5f1fbcdf",
// };

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
          expiracao: 900
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
            // url: "https://api-pix.gerencianet.com.br/v2/cob",
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
        // url: "https://api-pix.gerencianet.com.br/oauth/token",
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