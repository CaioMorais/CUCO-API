const express = require('express');
const app = express();
const router = express.Router();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = 3000;

//Carrega as rotas
const loginRoute = require("./Routes/LoginRoute");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "CUCO API",
      description: "",
      contact: {
        name: ""
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["index.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/login', loginRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})