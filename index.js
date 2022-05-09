const express = require('express');
const app = express();
var bodyParser = require ("body-parser")
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true} ));
app.use(express.json());
const router = express.Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
