/*const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/cucoprod?retryWrites=true&w=majority',{
  useNewUrlParser : true,
  useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado a base de dados!"));*/


const {MongoClient} = require('mongodb')
const Mongo_DB_URL = 'mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net'
const nome_banco = 'cucoprod'
const connection = () => MongoClient
  .connect(Mongo_DB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
  })
  .then((conn) => conn.db(nome_banco))
  .catch((err) => {
    console.error(error);
    process.exit(1);
  })

module.exports = connection;