var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carteiraSchema = new Schema({
    metaFinal: {
        type: String,
        required: true 
    },
    valorAtual: {
        type: String,
        required: true 
    },
    idRestaurante: {
        type: String,
        required: true 
    },
    idOng: {
        type: String,
        required: true 
    },
    valorPrato: {
        type: String,
        required: true 
    } 
})

module.exports = mongoose.model('carteira', carteiraSchema);

