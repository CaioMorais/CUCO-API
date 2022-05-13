const express = require('express');
const app = express();
const bodyParser = require ("body-parser")
const router = express.Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true} ));
app.use(express.json());
app.use(express.json({ type: 'application/json' }));

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
  console.error(error);
  process.exit(1);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


