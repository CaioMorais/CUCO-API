const loginRoute = require("./Routes/LoginRoute");
<<<<<<< HEAD
const contaRoute = require("./Routes/ContaRoute");
const carteiraRoute = require("./Routes/CarteiraRoute");

module.exports = loginRoute
module.exports = contaRoute
module.exports = carteiraRoute
=======
const carteiraRoute = require("./Routes/CarteiraRoute")
const doacaoRoute = require("./Routes/doacaoRoute");
const gerenciamentoRoute = require("./Routes/GerenciamentoRoute")
module.exports = [loginRoute, carteiraRoute, doacaoRoute, gerenciamentoRoute] 
>>>>>>> 1cc485db5cafb57a1b6fd73202faa6f0e8fdda2e
