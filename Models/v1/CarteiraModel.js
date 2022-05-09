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
    ong_IdOng: {
        type: String,
        required: true 
    },
    valorPrato: {
        type: String,
        required: true 
    } 
})

module.exports = mongoose.model('Carteira', carteiraSchema);

