let Result = require("../Domain/Entities/Result.js")

exports.PaginaDoacao = (req, res, next) =>{
    result = new Result("PaginaDoacao", true, 'H5dd5adA4ssd8f56F5F5DF55sasa8dD4FA5FA5S2342DADA8VAS')
    console.log(result)
    res.status(200).send(result)
}

exports.QRCodePaginaDoacao = (req, res, next) =>{
    result = new Result("QRCodePaginaDoacao", true, 'Pagina acessada com sucesso')
    console.log(result)
    res.status(200).send(result)
}

exports.ConfirmaTokenRetirada = (req, res, next) =>{
    result = new Result("ConfirmaTokenRetirada", true, 'Token Confirmado com Sucesso')
    console.log(result)
    res.status(200).send(result)
}

exports.GeraTokenRetirada = (req, res, next) =>{
    result = new Result("GeraTokenRetirada", true, '5895AD418556DSD4')
    console.log(result)
    res.status(200).send(result)
}

exports.GeraTokenRetirada = (req, res, next) =>{
    result = new Result("GeraTokenRetirada", true, '5895AD418556DSD4')
    console.log(result)
    res.status(200).send(result)
}

exports.EnviaEmailRecompensa = (req, res, next) =>{
    result = new Result("EnviaEmailRecompensa", true, 'Obrigado por sua doação, você ganhou 1000 pontos!!!')
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
