const supertest = require('supertest');
const app = require("../index");

var authToken;
//LOGIN
describe('Login', () => {
    it('Login, Autentica Usuario', async () => {
        const res = await supertest(app)
        .get('/api/v1/login/autenticar')
        .query({email: "joaocabral@mail.com",
              senha: "testetestando"})
        expect(res.statusCode).toEqual(200)
        authToken = res._body.token;
    }) 

    it('Login, Usuario não autorizado', async () => {
        const res = await supertest(app)
        .get('/api/v1/login/autenticar')
        .query({email: "emailfake@mail.com",
              senha: "testetestando"})
        expect(res.statusCode).toEqual(401)
    }) 
})

// CARTEIRA
describe('Carteira', () => {
    it('Retorna as carteiras', async () => {
        const res = await supertest(app)
        .get('/api/v1/Carteira/ListaCarteira')
        .send()
        expect(res.statusCode).toEqual(200)
    })

    var idCarteira;
    it('Insere Carteira', async () => {
        var randomNum = Math.random() * (1000 - 1 + 1) + 1;
        const res = await supertest(app)
          .post('/api/v1/Carteira/InsereCarteira')
          .send({metaFinal: randomNum,
                valorAtual: "500",
                idRestaurante: "1212" + randomNum,
                idOng: "423423423" + randomNum,
                valorPrato: "35"})
        expect(res.statusCode).toEqual(200)
        idCarteira = res._body.content._id;
    })

    it('Envia email para Ong', async () => {
        const res = await supertest(app)
        .get('/api/v1/Carteira/EnviaEmail')
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Lista Carteira por ID', async () => {
        console.log(idCarteira);
        const res = await supertest(app)
        .get('/api/v1/Carteira/ListaCarteiraId/' + idCarteira)
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Edita Valor do Prato', async () => {
        const res = await supertest(app)
          .put('/api/v1/Carteira/EditaValorPrato/' + idCarteira)   
          .send({metaFinal: "2000",
                valorAtual: "400",
                idRestaurante: "1212",
                idOng: "423423423",
                valorPrato: "50"})
        expect(res.statusCode).toEqual(200)
    });

    it('Edita Carteira', async () => {
        const res = await supertest(app)
          .put('/api/v1/Carteira/EditarCarteira/' + idCarteira)    
          .send({metaFinal: "2000",
                valorAtual: "400",
                idRestaurante: "1212",
                idOng: "423423423",
                valorPrato: "35"})
        expect(res.statusCode).toEqual(200)
    })



    it('Deleta Carteira', async () => {
        const res = await supertest(app)
          .delete('/api/v1/Carteira/DeletaCarteira/' + idCarteira)
          .send()
        expect(res.statusCode).toEqual(200)
    })


})

//CONTA
describe('Conta', () => {
    var idConta;
    var randomNum = Math.random() * (1000 - 1 + 1) + 1;
    var emailAleatorio = "contateste"+ randomNum +"@mail.com"
    console.log(emailAleatorio);
    it('Cria Conta', async () => {  
        const res = await supertest(app)
          .post('/api/v1/Conta/Cadastrar')
          .send({nome: "conta do teste" + randomNum,
                email: emailAleatorio,
                senha: "123456",
                dataCadastro: "14/05/2022"})
        expect(res.statusCode).toEqual(200)
        idConta = res._body.content._id;
    })

    it('Tenta criar conta ja existente', async () => {
        const res = await supertest(app)
          .post('/api/v1/Conta/Cadastrar')
          .send({nome: "conta do teste" + randomNum,
                email: emailAleatorio,
                senha: "123456",
                dataCadastro: "14/05/2022"})
        expect(res.statusCode).toEqual(400)
    })
    console.log(emailAleatorio);

    it('Resetar Senha', async () => {
        const res = await supertest(app)
        .post('/api/v1/Conta/ResetarSenha')
        .send()
        expect(res.statusCode).toEqual(200)
    })
    
    it('Exclui Conta', async () => {
        const res = await supertest(app)
        .delete('/api/v1/Conta/Excluir')
        .send()
        expect(res.statusCode).toEqual(200)
    })
})

//DOAÇÃO
describe('Doação', () => {
    it('Cadastra Doação', async () => {
        const res = await supertest(app)
        .post('/api/v1/Doacao/CadastraDoacao')
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Gera QR Code Link Doação', async () => {
        const res = await supertest(app)
        .get('/api/v1/Doacao/QRCodeLinkDoacao')
        .send()
        expect(res.statusCode).toEqual(200)
    }) 

    it('Gera Token Retirada', async () => {
        const res = await supertest(app)
        .get('/api/v1/Doacao/GeraTokenRetirada')
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Gera Token Retirada', async () => {
        const res = await supertest(app)
        .get('/api/v1/Doacao/ValidaToken')
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Gera Token Entrega', async () => {
        const res = await supertest(app)
        .get('/api/v1/Doacao/GeraTokenEntrega')
        .send()
        expect(res.statusCode).toEqual(200)
    })
})

//GERENCIAMENTO
describe('Gerenciamento', () => {
    it('Hitorico de Doações', async () => {
        const res = await supertest(app)
        .get('/api/v1/Gerenciamento/HistoricoDoacoes')
        .set({authorization: authToken })
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Hitorico de Retiradas', async () => {
        const res = await supertest(app)
        .get('/api/v1/Gerenciamento/HistoricoRetiradas')
        .set({authorization: authToken })
        .send()
        expect(res.statusCode).toEqual(200)
    }) 

    it('Lista Ongs', async () => {
        const res = await supertest(app)
        .get('/api/v1/Gerenciamento/ListaOngs')
        .set({authorization: authToken })
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Aceita Solicitacoes De Estabelecimentos', async () => {
        const res = await supertest(app)
        .get('/api/v1/Gerenciamento/AceitarSolicitacoesDeEstabelecimentos')
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Historico de Entregas', async () => {
        const res = await supertest(app)
        .get('/api/v1/Gerenciamento/HistoricoEntregas')
        .set({authorization: authToken })
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Gera Solicitacao Parceria Para Ong', async () => {
        const res = await supertest(app)
        .post('/api/v1/Gerenciamento/GeraSolicitacaoParceriaParaOng')
        .send()
        expect(res.statusCode).toEqual(200)
    })

    it('Lista Solicitacoes', async () => {
        const res = await supertest(app)
        .get('/api/v1/Gerenciamento/ListaSolicitacoes')
        .send()
        expect(res.statusCode).toEqual(200)
    })  
})


