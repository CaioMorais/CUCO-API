var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entregaRetiradasSchema = new Schema({
    idCarteira: {
        type: String,
        required: true 
    },
    tokenOng: {
        type: String,
        required: true
    },
    tokenRestaurante: {
        type: String,
        required: true
    },
    verificaTokenOng: {
        type: String,
        required: true
    },
    verificaTokenRestaurante: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('entregaRetirada', entregaRetiradasSchema);