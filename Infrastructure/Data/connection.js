const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser : true,
  useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado a base de dados!"));