let Result = require("../Domain/Entities/Result.js");
const {hitoricoRetiradas, hisotricoEntrega, hisotricoDoacoes, geraSolicitacaoParceriaParaOng,  aceitarSolicitacoesDeEstabelecimentos, listaOngs, listaSolicitacoes} = require("../Services/GerenciamentoService");

exports.HistoricoDoacoes = (req, res, next) =>{
    result = new Result([
        {
            "numero pedido": 123,
            "data da criação": "28/07/2021",
            "data envio": "28/07/2021",
            "nome cliente": "João José da Silva",
            "numero cliente": 50,
            "estado": "concluido",
            "numero de envio": 559
        },
        {
            "numero pedido": 124,
            "data da criação": "28/08/2021",
            "data envio": "28/08/2021",
            "nome cliente": "Carla Silva Santos",
            "numero cliente": 55,
            "estado": "concluido",
            "numero de envio": 589
        }
    ], true, "")
    console.log(result)
    res.status(200).send(result)
};

exports.ListaOngs = (req, res, next) =>{
    result = new Result([
        {
            "ID": 1,
            "Data da Criação do Cadastro": "28/01/2022",            
            "Nome ONG": "Atitude e Vida",         
            "Nome Responsável": "Carlos Ramos",            
            "Status": "Ativo",            
            "Endereço": "Rua doze, 6",
            "Bairro": "Aclimação",
            "Cidade": "São Paulo",
            "Estado": "SP"
        },
        {
            "ID": 2,
            "Data da Criação do Cadastro": "29/01/2022", 
            "Nome ONG": "Reviver",                    
            "Nome Responsável": "Roberto Lopes",            
            "Status": "Ativo",
            "Endereço": "Rua XV de outubro, 555",
            "Bairro": "Cidade Ademar",
            "Cidade": "São Paulo",
            "Estado": "SP"            
        }
    ], true, "")
    console.log(result)
    res.status(200).send(result)
};

//Estabelecimento
exports.GeraSolicitacaoParceriaParaOng = (req, res, next) =>{
    result = new Result("GeraSolicitacaoParceriaParaOng", true, "Solicitação Gerada!")
    console.log(result)
    res.status(200).send(result)
};

//Ong
exports.ListaSolicitacoes = (req, res, next) =>{
    result = new Result([
        {
            "ID": 1,
            "Data de Solicitação": "07/04/2022",            
            "Nome Estabelecimento": "Churrascaria Pão e Grill",          
            "Bairro": "Jardim Itapuá",
            "Cidade": "São Paulo",
            "Estado": "SP",
            "Status:": "Pendente"
        },
    ], true, "")
    console.log(result)
    res.status(200).send(result)
};


//Ong
exports.AceitarSolicitacoesDeEstabelecimentos = (req, res, next) =>{
    result = new Result("AceitarSolicitacoesDeEstabelecimentos", true, "Solicitação aceita!")
    console.log(result)
    res.status(200).send(result)
};


//Estabelecimento
exports.HistoricoRetiradas = (req, res, next) =>{
    result = new Result([
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
};


//Ong
exports.HistoricoEntregas = (req, res, next) =>{
    result = new Result([
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
};


// exports.HistoricoDoacoes = (req, res, next) =>{
//     res.status(201).send(
//         "Doacoes" [
//             {
//                 "numero pedido": 123,
//                 "data da criação": "28/07/2021",
//                 "data envio": "28/07/2021",
//                 "nome cliente": "João José da Silva",
//                 "numero cliente": 50,
//                 "estado": "concluido",
//                 "numero de envio": 559
//             },
//             {
//                 "numero pedido": 124,
//                 "data da criação": "28/08/2021",
//                 "data envio": "28/08/2021",
//                 "nome cliente": "Carla Silva Santos",
//                 "numero cliente": 55,
//                 "estado": "concluido",
//                 "numero de envio": 589
//             }
//         ]
//     )
// }
