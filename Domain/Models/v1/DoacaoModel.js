var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doacaoSchema = new Schema({
    quantidadePratosDoados: {
        type: String,
        required: true 
    },
    dataDoacao: {
        type: String,
        required: true 
    },
    dataPagamento: {
        type:String,
        required: false
    },
    idClienteDoador: {
        type: String,
        required: true 
    },
    idRestaurante: {
        type: String,
        required: true 
    },
    locId: {
        type: Number,
        required: true
    },
    txId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('doacoe', doacaoSchema);