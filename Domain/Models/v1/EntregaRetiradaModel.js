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
})

module.exports = mongoose.model('entregaRetirada', entregaRetiradasSchema);