//Conexão antiga com driver mongodb

/* const {MongoClient} = require('mongodb')
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

module.exports = connection */


