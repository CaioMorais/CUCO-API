const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();


mongoose.connect('mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser : true,
  useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado a base de dados!"));


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = 443;

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
  apis: ["./Routes/*.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions)

routes.forEach(route => {
  app.use('/api', route);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
