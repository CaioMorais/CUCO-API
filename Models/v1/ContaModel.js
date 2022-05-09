const connection = require("../../Infrastructure/Data/connection");


const listaContas = async () => {
    const db = await connection();
    return db.collection('usuarios').find().toArray();
    
}

const novaConta = async ({nome, email, senha, dataCadastro}) => {
    const db = await connection();
    await db.collection('usuarios').insertOne({nome, email, senha, dataCadastro});
    return {nome, email, dataCadastro};
}

const verificaContaExiste = async ({email}) =>{
    const db = await connection();
    let usuario = null;
    if (email) {
        usuario = await db.collection('usuarios').findOne({email})
    }
    return usuario;
}

module.exports = {novaConta, listaContas, verificaContaExiste};