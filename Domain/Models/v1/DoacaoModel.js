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
    idClienteDoador: {
        type: String,
        required: true 
    },
    idRestaurante: {
        type: String,
        required: true 
    } 
})

module.exports = mongoose.model('doacoe', doacaoSchema);