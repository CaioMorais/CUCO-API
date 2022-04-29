const express = require('express');

const app = express();
const router = express.Router();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
