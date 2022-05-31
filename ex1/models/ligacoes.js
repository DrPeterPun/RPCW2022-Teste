const mongoose = require('mongoose')

var ligacoesSchema = new mongoose.Schema({
    id: String,
    origem: String,
    destino: String,
    distancia: Number,
})

//exportar o modelo
module.exports = mongoose.model('ligacoes',ligacoesSchema)