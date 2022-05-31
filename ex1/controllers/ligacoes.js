var Ligacoes = require('../models/ligacoes')

module.exports.listar = function(){
    return Ligacoes 
            .find()
            .exec()
}

module.exports.procura_origem = function(o){
    return Ligacoes 
            .find({origem: o})
            .exec()
}

module.exports.procura_dist = function(dist){
    return Cidades
            .findOne({},{distancia: { 'gt':dist}})
            .exec()
}


