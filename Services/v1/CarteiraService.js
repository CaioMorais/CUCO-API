let Result = require("../../Domain/Entities/Result");
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');
var nodemailer = require('nodemailer');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');


async function inserirCarteira(req) {
   try {

      var carteira = carteiraSchema(req.body);

      await carteira.save();

      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }

}

async function listagemCarteiraIDRestaurante(id) {
   try {
      var result;
      var carteira = await carteiraSchema
         .findOne({ idRestaurante: id, status: "true" });

      if (carteira) {
         var ong = await estabelecimentoSchema.findById(carteira.idOng);

         var carteiraResult = {
            "metaFinal": carteira.metaFinal,
            "valorAtual": carteira.valorAtual,
            "idRestaurante": carteira.idRestaurante,
            "idOng": carteira.idOng,
            "valorPrato": carteira.valorPrato,
            "descPratoDoado": carteira.descPratoDoado,
            "entregasPendentes": carteira.entregasPendentes,
            "nomeOng": ong.nomeEstabelecimento,
            "enderecoOng": await retornaEndereco(ong),
            "descricaoOng": ong.descricao,
            "contatoOng": ong.telefone,
            "paginaWebOng" : ong.paginaWeb,
            "idCarteira": carteira._id
         }

         var result = new Result(carteiraResult, true, "Carteira restaurante", 200);
      }
      else {
         result = new Result(carteira, false, "Carteira não encontrada", 200);
      }
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }
}

const listagemCarteirasIDOng = async function(id) {
   try {
      var result = new Result();
      var carteiras = await carteiraSchema
         .find({ idOng: id, status: "true" });
      console.log(carteiras);

      if (carteiras.length != 0) {         
         result.content = [];
         for (let index = 0; index < carteiras.length; index++) {
            var restaurante = await retornaDadosEstalecimento(carteiras[index].idRestaurante);
            var carteiraResult = {
               "metaFinal": carteiras[index].metaFinal,
               "valorAtual": carteiras[index].valorAtual,
               "idRestaurante": carteiras[index].idRestaurante,
               "idOng": carteiras[index].idOng,
               "valorPrato": carteiras[index].valorPrato,
               "descPratoDoado": carteiras[index].descPratoDoado,
               "entregasPendentes": carteiras[index].entregasPendentes,
               "nomeRestaurante": restaurante.nomeEstabelecimento,
               "enderecoRestaurante": await retornaEndereco(restaurante),
               "descricaoRestaurante": restaurante.descricao,
               "contatoRestaurante": restaurante.telefone,
               "paginaWebRestaurante" : restaurante.paginaWeb,
               "idCarteira": carteiras[index]._id
            }
            result.content.push(carteiraResult);
         }
         result.success = true;
         result.status = 200
         result.messages = "" 
      }
      else {
         result = new Result([], false, "Nenhuma Carteira encontrada", 200);
      }
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }
}

async function listagemCarteiras() {
   try {
      var result;
      var retorno = await carteiraSchema
         .find();

      if (retorno) {
         var result = new Result(retorno, true, "lista de Carteiras", 200);
      }
      else {
         result = new Result(retorno, false, "Nenhuma Carteira encontrada", 200);
      }
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }
}

async function listagemCarteirasId(id) {
   try {
      var result;
      var carteira = await carteiraSchema
         .findById(id);

      if (carteira) {
         result = new Result(carteira, true, "Carteira encontrada", 200);
      }
      else {
         result = new Result(carteira, false, "Carteira não encontrada", 200);
      }
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }

}


async function listaValorPratoId(id) {
   try {
      var result;
      var retorno = await carteiraSchema.findOne({ idRestaurante: id });

      if (retorno) {
         result = new Result(retorno.valorPrato, true, "Valor encontrado", 200);
      }
      else {
         result = new Result(retorno, false, "Carteira não encontrada", 200);
      }
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }

}

async function listagemEstabelecimentoId(id) {
   try {
      var retorno = await estabelecimentoSchema.findById(id);

      var result = new Result(retorno, true, "Lista de estabelecimentos", 200);
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }

}

async function editandoCarteira(id, req) {
   try {
      var carteira = listagemCarteirasId(id);

      var metaFinal = body.metaFinal == null ? carteira.metaFinal : body.metaFinal;
      var valorAtual = body.valorAtual == null ? carteira.valorAtual : body.valorAtual;
      var idRestaurante = body.idRestaurante == null ? carteira.idRestaurante : body.idRestaurante;
      var idOng = body.idOng == null ? carteira.idOng : body.idOng;
      var valorPrato = body.valorPrato == null ? carteira.valorPrato : body.valorPrato;
      var descPratoDoado = body.descPratoDoado == null ? carteira.descPratoDoado : body.descPratoDoado;
      var entregasPendentes = body.entregasPendentes == null ? carteira.entregasPendentes : body.entregasPendentes;
      var status = body.status == null ? carteira.status : body.status;

      var retorno = await carteiraSchema
         .updateOne({ _id: id }, {
            $set: {
               metaFinal: metaFinal, valorAtual: valorAtual,
               idRestaurante: idRestaurante, idOng: idOng, valorPrato: valorPrato,
               descPratoDoado: descPratoDoado, entregasPendentes: entregasPendentes, status: status
            }
         });

      var result = new Result(retorno, true, "Carteira editada com sucesso", 200);
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }
}

async function insereValorCarteira(id, valorDoado) {
   try {
      var carteira = await carteiraSchema.findOne({ idRestaurante: id });
      var result;
      console.log(valorDoado);
      if (parseFloat(carteira.valorAtual) + parseFloat(valorDoado) >= parseFloat(carteira.metaFinal)) {
         var retorno = await insereValorCarteiraComMetaAtingida(carteira, valorDoado)

         if (retorno != null) {
            result = new Result(retorno, true, "Valor inserido com sucesso, carteira teve seu limite atingido", 200);
         }
         else {
            result = new Result(retorno, false, "Valor não inserido", 400);
         }
      }
      else {
         var retorno = await insereValorCarteiraSemMetaAtingida(carteira, valorDoado);

         if (retorno != null) {
            var result = new Result(retorno, true, "Valor inserido com sucesso", 200);
         }
         else {
            result = new Result(retorno, false, "Valor não inserido", 400);
         }

      }
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }
}


async function envioMetaCarteiraAtingido(carteira) {
   try {
      var dadosEstabelecimento = await listagemEstabelecimentoId(carteira.idRestaurante);
       
      var emailEnvio = "no-reply.cuco@outlook.com.br";
      var senha = "CucoProjeto1@";
      var emailDestino = dadosEstabelecimento.emailEstabelecimento;
      var nomeEstabelecimeto = dadosEstabelecimento.nomeEstabelecimento;
      var metaFinal = dadosEstabelecimento.metaFinal;
      var contato = dadosEstabelecimento.contato;
      var assunto = "Limite de Carteira Atingido! - " + nomeEstabelecimeto;
      var service = "outlook";
      var caminhoHtml = "/helperService/TemplateEmailMetaCarteiraAtingido.ejs";

      ejs.renderFile(__dirname + caminhoHtml, {meta: metaFinal, nome: nomeEstabelecimeto, contato: contato}, function (err, data) 
      {
          if (err) {
              console.log(err);
          } else {
              var transporter = nodemailer.createTransport({
                  host: "smtp-mail.outlook.com",
                  service: service,
                  port: 587,
                  secureConnection: false,
                  tls: {
                      ciphers: 'SSLv3'                            // tls version
                  },
                  auth: {
                      user: emailEnvio,
                      pass: senha
                  }
              });
   
              var mainOptions = {
                  from: emailEnvio,
                  to: emailDestino,
                  subject: assunto,
                  html: data
              };
  
              transporter.sendMail(mainOptions, function (err, info) {
                  if (err) {
                     console.log(err);
                  } else {
                      console.log("Email enviado com sucesso.");
                  }
              });
          }
      })

   } catch (error) {
      return error;
   }
}


async function deletandoCarteira(id) {
   try {

      var retorno = await carteiraSchema
         .deleteOne({ _id: id });
      var result = new Result(retorno, true, "Carteira deletada com sucesso", 200);
      return result;

   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }

}

async function editandoValorPrato(id, novoValor) {
   try {

      var carteira = carteiraSchema();
      carteira = carteiraSchema.findById(id);
      carteira.valorPrato = novoValor;

      var retorno = await carteiraSchema
         .updateOne({ _id: id }, { $set: { valorPrato: carteira.valorPrato } });

      var result = new Result(retorno, true, "Valor do prato editado com sucesso", 200);
      return result;


   } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
   }

}

///-------------------- Metodos Auxiliares --------------------------------

const insereValorCarteiraComMetaAtingida = async (carteira, valorDoado) => {
   try {
      console.log(valorDoado)
      envioMetaCarteiraAtingido(carteira);
      var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valorDoado) - parseFloat(carteira.metaFinal)).toString();
      var entregasPendentes = parseFloat(carteira.entregasPendentes) + 1;
      var retorno = await carteiraSchema.updateOne({ _id: carteira.id }, {
         $set: {
            valorAtual: valorAtual,
            entregasPendentes: entregasPendentes
         }
      });

      return retorno;

   } catch (error) {
      return retorno = null;
   }
}

const insereValorCarteiraSemMetaAtingida = async (carteira, valorDoado) => {
   try {

      var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valorDoado)).toString();
      var retorno = await carteiraSchema.updateOne({ _id: carteira.id }, { $set: { valorAtual: valorAtual } });

      return retorno;

   } catch (error) {
      return retorno = null;
   }
}

const retornaDadosEstalecimento = async function (idEstabelecimento) {
   var result = await estabelecimentoSchema.findById(idEstabelecimento);
   return result;
}

const retornaEndereco = async function (estabelecimento) {
   var endereco = estabelecimento.logradouro + ", " + 
                  estabelecimento.numero + ", " + 
                  estabelecimento.complemento + ", " +
                  estabelecimento.bairro + ", " +
                  estabelecimento.cidade;
   return endereco;
   
}

module.exports = {
   listaValorPratoId, editandoValorPrato, inserirCarteira,
   listagemCarteiras, listagemCarteirasId, editandoCarteira,
   deletandoCarteira, insereValorCarteira, listagemCarteiraIDRestaurante, listagemCarteirasIDOng
}

