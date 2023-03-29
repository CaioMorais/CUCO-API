var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteDoadorSchema = new Schema({
    nome: {
        type: String,
        required: true 
    },
    cpf: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true 
    },
    totalPratosDoados: {
        type: String,
        required: false
    } 
})

module.exports = mongoose.model('clientesDoadore', clienteDoadorSchema);