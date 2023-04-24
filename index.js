const express = require('express');
const cors = require('cors')
const axios = require('axios')
const bodyParser = require ("body-parser")
const router = express.Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true} ));
app.use(express.json());
app.use(express.json({ type: 'application/json' }));
app.use(cors({origin: '*'}));
const fs = require("fs");
const https = require("https");

const port = process.env.PORT || 3000;

//Carrega as rotas
const routes = require("./Routes.js");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      version: "1.0.0",
      title: "CUCO API",
      description: "",
      contact: {
        name: ""
      },
      servers: ["http://localhost:3000"]
    }
  },
  // ['.routes/*.js']
  apis: ["./Routes/v1/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)

routes.forEach(route => {
  app.use('/api/', route);
});

app.get('/teste', function(req, res) {
  res.send('hello world');
});
app.post('/testewebhook', function(req, res) {
  res.send('web hook funfou');
});

//Insira o caminho de seu certificado .p12 dentro de seu projeto
var certificado = fs.readFileSync("./certificado.p12");

//Insira os valores de suas credenciais em desenvolvimento do pix
var credenciais = {
  client_id: "Client_Id_b6d01b32004025f0cc6d51cef72d2e7fda00c72c",
  client_secret: "Client_Secret_f4a18359309f5d7f5ba78fa8e2f138987d966883",
};

var data = JSON.stringify({ grant_type: "client_credentials" });
var data_credentials = credenciais.client_id + ":" + credenciais.client_secret;

// Codificando as credenciais em base64
var auth = Buffer.from(data_credentials).toString("base64");

const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});
//Consumo em desenvolvimento da rota post oauth/token
var config = {
  method: "POST",
  url: "https://api-pix-h.gerencianet.com.br/oauth/token",
  headers: {
    Authorization: "Basic " + auth,
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
  data: data,
};

app.post('/testetoken', async function(req,res) {
  var result = "" 
  axios(config)
  .then(function (response) {
    result = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
  return result;
})

// app.use('/api', routes.loginRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//BANCO
const Mongo_URL = 'mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/'
const banco = 'cucoprod?retryWrites=true&w=majority'
var uri = Mongo_URL + banco;
mongoose.connect(uri).then(()=> {
   console.log("Banco conectado");
})
.catch((err) => {
  console.error(err);
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports = server;
