let Result = require("../../Domain/Entities/Result.js");
const {hitoricoRetiradas, hisotricoEntrega, hisotricoDoacoes, geraSolicitacaoParceriaParaOng,  
    aceitarSolicitacoesDeEstabelecimentos,listaOngs, listaSolicitacoesParaOng, 
    recusaSolicitacoesDeEstabelecimentos, excluirSolicitacaoDeEstabelecimento} = require("../../Services/v1/GerenciamentoService");

exports.HistoricoDoacoes = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await hisotricoDoacoes(id);
    res.status(result.status).send(result);
}

exports.ListaOngs = async (req, res, next) =>{
    var result = await listaOngs();
    res.status(result.status).send(result);

}

//Estabelecimento
exports.GeraSolicitacaoParceriaParaOng = async (req, res, next) =>{
    var result = await geraSolicitacaoParceriaParaOng(req);
    console.log(result);
    res.status(result.status).send(result); 
}

//Ong
exports.ListaSolicitacoesParaOng = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listaSolicitacoesParaOng(id);
    console.log(result);
    res.status(result.status).send(result); 
}


//Ong
exports.AceitarSolicitacoesDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await aceitarSolicitacoesDeEstabelecimentos(id);
    console.log(result)
    res.status(result.status).send(result)
}

exports.RecusaSolicitacoesDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await recusaSolicitacoesDeEstabelecimentos(id);
    console.log(result)
    res.status(result.status).send(result)
}

exports.ExcluirSolicitacoesDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await excluirSolicitacaoDeEstabelecimento(id);
    console.log(result)
    res.status(result.status).send(result)
}


//Estabelecimento
exports.HistoricoRetiradas = (req, res, next) =>{
    var result = new Result([
        {
            "ID": 1,
            "Data de Retirada": "07/02/2022",            
            "Nome Estabelecimento": "Churrascaria Pão e Grill",         
            "Nome Responsável": "José Walter", 
            "Contato Estabelecimento" : "11 93242-9871",           
            "Quantidade de Concessoes": "200",            
            "Endereço": "Avenida Brasil, 534",
            "Bairro": "Jardim Itapuá",
            "Cidade": "São Paulo",
            "Estado": "SP"
        },
        {
            "ID": 2,
            "Data de Retirada": "15/03/2022",            
            "Nome Estabelecimento": "Churrascaria Pão e Grill",         
            "Nome Responsável": "Manoel Miranda da Silva", 
            "Contato Estabelecimento" : "11  93242-9871",           
            "Quantidade de Concessoes": "150",            
            "Endereço": "Avenida Brasil, 534",
            "Bairro": "Jardim Itapuá",
            "Cidade": "São Paulo",
            "Estado": "SP"           
        }
    ], true, ""
    )
    console.log(result)
    res.status(200).send(result)
}


//Ong
exports.HistoricoEntregas = (req, res, next) =>{
    var result = new Result([
        {
            "ID": 1,
            "Data de Retirada": "07/02/2022",            
            "Nome Ong": "Reviver",         
            "Nome Responsável": "Manoel Frreira", 
            "Contato Estabelecimento" : "11 95968 8596",           
            "Quantidade de Concessoes": "200",            
            "Endereço": "Avenida Arapua, 952",
            "Bairro": "Jardim Itapuá",
            "Cidade": "São Paulo",
            "Estado": "SP"
        },
        {
            "ID": 2,
            "Data de Retirada": "15/03/2022",            
            "Nome Ong": "Reviver",         
            "Nome Responsável": "Manoel Frreira", 
            "Contato Estabelecimento" : "11 95968 8596",           
            "Quantidade de Concessoes": "150",            
            "Endereço": "Avenida Arapua, 952",
            "Bairro": "Jardim Itapuá",
            "Cidade": "São Paulo",
            "Estado": "SP"          
        }
    ], true, ""
    )
    console.log(result)
    res.status(200).send(result)  
}

