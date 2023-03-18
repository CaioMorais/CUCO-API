var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estabelecimentoSchema = new Schema({
    nomeEstabelecimento: {
        type: String,
        required: true 
    },
    razaoSocial: {
        type: String,
        required: true 
    },
    tipo: {
        type: String,
        required: true 
    },
    cnpj: {
        type: String,
        required: true 
    },
    cep: {
        type: String,
        required: true 
    },
    cidade: {
        type: String,
        required: true 
    },
    estado: {
        type: String,
        required: true 
    },
    bairro: {
        type: String,
        required: true 
    },
    logadouro: {
        type: String,
        required: true 
    },
    complemento: {
        type: String,
        required: true 
    },
    emailEstabelecimento: {
        type: String,
        required: true 
    },
    telefone: {
        type: String,
        required: true 
    },
    descPratoDoado: {
        type: String,
        required: true 
    },
    valorPrato: {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('estabelecimento', estabelecimentoSchema);