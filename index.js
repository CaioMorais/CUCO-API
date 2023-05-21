const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser")
const router = express.Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/json' }));
app.use(cors({ origin: '*' }));
const doacaoController = require("./Controllers/v1/DoacaoController");

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

app.get('/teste', function (req, res) {
  res.send('hello world');
});

// app.use('/api', routes.loginRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//BANCO
const Mongo_URL = 'mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/'
const banco = 'cucoprod?retryWrites=true&w=majority'
var uri = Mongo_URL + banco;
mongoose.connect(uri).then(() => {
  console.log("Banco conectado");
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Endpoint para configuração do webhook, você precisa cadastrar https://SEUDOMINIO.com/webhook
app.post("/webhook", (request, response) => {
    response.status(200).end();
});

// Endpoind para recepção do webhook tratando o /pix
app.post("/webhook/pix", (request, response) => {
    result = doacaoController.efiCallback(request);
    response.status(200).end();
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports = server;
