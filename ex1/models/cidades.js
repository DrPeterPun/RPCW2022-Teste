const mongoose = require('mongoose')

var cidadesSchema = new mongoose.Schema({
    id: String,
    nome: String,
    populacao: Number,
    descricao: String,
    distrito: String
})

//exportar o modelo
module.exports = mongoose.model('cidades',cidadesSchema)