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
    anexoDocumento1: {
        type: String,
        required: false 
    },
    anexoDocumento2: {
        type: String,
        required: false 
    },
    anexoComprovanteCNPJ: {
        type: String,
        required: false 
    },
    anexoComprovanteEndereco: {
        type: String,
        required: false 
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
        required: false
    },
    emailEstabelecimento: {
        type: String,
        required: true 
    },
    telefone: {
        type: String,
        required: true 
    },
    chavePix: {
        type: String,
        required: false 
    },
    tipoChavePix: {
        type: String,
        required: false 
    },
    fotoPerfil: {
        type: String,
        required: false 
    },    
    descricao: {
        type: String,
        required: false 
    },
    paginaWeb: {
        type: String,
        required: false 
    } 
})

module.exports = mongoose.model('estabelecimento', estabelecimentoSchema);