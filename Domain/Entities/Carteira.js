var Schema = require('mongoose').Schema;


class Carteira{
    constructor(preco){
        carteira = Schema({
            valorPrato: preco
        });

    }    
}

module.exports = Carteira;