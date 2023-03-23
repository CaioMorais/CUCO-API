var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contaSchema = new Schema({
    nome: {
        type: String,
        required: true 
    },
    sobrenome: {
        type: String,
        required: true 
    },
    cpf: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    senha: {
        type: String,
        required: true 
    },
    tipoConta: {
        type: String,
        required: true 
    },
    idEstabelecimento: {
        type: String,
        required: true 
    },
    verificaAtivo: {
        type: String,
        required: true 
    },
    dataCadastro: {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('usuario', contaSchema);