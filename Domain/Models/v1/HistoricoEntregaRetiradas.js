var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistoricoEntregaRetiradasSchema = new Schema({
    idCarteira: {
        type: String,
        required: true 
    },
    dataEntregaRetirada: {
        type: String,
        required: true
    },
    quantidadePratosEntregues: {
        type: String,
        required: true
    },
    nomeOng: {
        type: String,
        required: true
    },
    nomeRestaurante: {
        type: String,
        required: true
    },
    idOng: {
        type: String,
        required: true
    },
    idRestaurante: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('HistoricoEntregaRetirada', HistoricoEntregaRetiradasSchema);