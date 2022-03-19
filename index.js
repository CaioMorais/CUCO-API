const express = require('express')
const app = express()
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const port = 3000

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Routes
app.use('/', require('./Routes/LoginRoute'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})