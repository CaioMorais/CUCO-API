let Result = HistoricoDoacoes("../Domain/Entities/Result.js")

    exports.HistoricoDoacoes = (req, res, next) =>{
        result = new Result("PaginaDoacao", true, 
        "Doacoes" [
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
        ])
        console.log(result)
        res.status(200).send(result)
    }


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
