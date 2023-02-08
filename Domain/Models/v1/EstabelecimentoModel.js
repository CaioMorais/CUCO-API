var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estabelecimentoSchema = new Schema({
    nomeEstabelecimento: {
        type: String,
        required: true 
    },
    tipoEstabelecimento: {
        type: String,
        required: true 
    },
    cnpj: {
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
    endereco: {
        type: String,
        required: true 
    },
    emailEstabelecimento: {
        type: String,
        required: true 
    },
    contato: {
        type: String,
        required: true 
    },
    chavePix: {
        type: String,
        required: true 
    },
    tipoChavePix: {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('estabelecimento', estabelecimentoSchema);