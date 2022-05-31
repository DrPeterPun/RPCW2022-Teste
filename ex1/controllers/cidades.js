var Cidades = require('../models/cidades')

//lista cidades
module.exports.listar = function(){
    return Cidades
            .find()
            .exec()
}

//lista uma cidade
module.exports.procura_id = function(id){
    return Cidades
            .findOne({id: id})
            .exec()
}

//procura por um nome
module.exports.procura_nome = function(nome){
    return Cidades
            .findOne({nome: nome})
            .exec()
}

//doas cidades de um dado dsitrito
module.exports.listar_distrito = function(dist){
    return Cidades
            .find({distrito: dist})
            .exec()
}

//exporta todos os nomes por ordem alfabetica
module.exports.nomes_alfabetico = function(){
    return Cidades
            .find({},{nome:1})
            .exec()
}

