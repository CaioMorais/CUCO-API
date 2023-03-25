var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var solicitacaoParceriaSchema = new Schema({
    idOng: {
        type: String,
        required: true 
    },
    idRestaurante: {
        type: String,
        required: true 
    },
    respostaOng: {
        type: String,
        required: true
    },
    respostaRestaurante: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true 
    },
    dataSolicitacao: {
        type: String,
        required: true 
    },
    dataResposta: {
        type: String,
        required: true 
    },
    idCarteira: {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('solicitacaoParceria', solicitacaoParceriaSchema);