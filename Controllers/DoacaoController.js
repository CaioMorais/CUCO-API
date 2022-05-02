let Result = require("../Domain/Entities/Result.js");
//let doacaoService = require("../Services/DoacaoService.js");


exports.PaginaDoacao = (req, res, next) =>{
    result = new Result("PaginaDoacao", true, 'Pagina acessada com sucesso')
    console.log(result)
    res.status(200).send(result)
}

exports.QRCodePaginaDoacao = (req, res, next) =>{
    result = new Result("QRCodePaginaDoacao", true, 'H5dd5adA4ssd8f56F5F5DF55sasa8dD4FA5FA5S2342DADA8VAS')
    console.log(result)
    res.status(200).send(result)
}

exports.ConfirmaTokenRetirada = (req, res, next) =>{
    result = new Result("ConfirmaTokenRetirada", true, 'Token Confirmado com Sucesso')
    console.log(result)
    res.status(200).send(result)
}

exports.GeraTokenRetirada = (req, res, next) =>{
    //var token = doacaoService.gerarTokenIndentificacaoRetiradaDoacoes();
    var token = 0
    result = new Result("GeraTokenRetirada", true, token)
    console.log(result)
    res.status(200).send(result)
}


exports.EnviaEmailRecompensa = (req, res, next) =>{
    result = new Result("EnviaEmailRecompensa", true, 'E-mail enviado com sucesso')
    console.log(result)
    res.status(200).send(result)
}

exports.CadastraDoacao = (req, res, next) => {

    result = new Result("CadastraDoacao", true, "Doação cadastrada com sucesso!")
    console.log(result)
    res.status(200).send(result)

}

    
// exports.PaginaDoacao = (req, res, next) =>{
//     res.status(201).send('H5dd5adA4ssd8f56F5F5DF55sasa8dD4FA5FA5S2342DADA8VAS')
// }

// exports.QRCodePaginaDoacao = (req, res, next) =>{
//     res.status(201).send('Pagina acessada com sucesso')
// }

// exports.GeraTokenRetirada = (req, res, next) =>{
//     res.status(201).send('5895AD418556DSD4')
// }

// exports.ConfirmaTokenRetirada = (req, res, next) =>{
//     res.status(201).send('Token Confirmado com Sucesso')
// }
