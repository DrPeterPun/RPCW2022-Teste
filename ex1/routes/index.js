var express = require('express');
var router = express.Router();
var Cidades = require('../controllers/cidades')
var Ligacoes = require('../controllers/ligacoes')

/* GET home page. */
router.get('/api/cidades/nomes', function(req, res, next) {
  Cidades.nomes_alfabetico().then(dados=>{
    delete dados.populacao
    delete dados.descricao
    res.status(200).jsonp(dados)
  })
  .cath(e => { 
    res.status(500).jsonp({erro: e})
  })
});

router.get('/api/cidades/', function(req, res, next) {
  //nao tem query sttring
  if (req.param('distrito')==='') {
    Cidades.listar().then(dados=>{
    delete dados.populacao
    delete dados.descricao
    res.status(200).jsonp(dados)
    }).cath(e => { 
      res.status(500).jsonp({erro: e})
    })
  //?distrito=DDDD
  }else{
    let dist = req.query.distrito;
    Cidades.listar_distrito(dist).then(dados=>{
      delete dados.populacao
      delete dados.descricao
      delete dados.distrito
      res.status(200).jsonp(dados)
    }).cath(e => { 
      res.status(500).jsonp({erro: e})
    })
  }
  });

router.get('/api/cidades/:id', function(req, res, next) {
  id = req.params.id
  Cidades.procura_id().then(dados=>{
    res.status(200).jsonp(dados)
  })
  .cath(e => { 
    res.status(500).jsonp({erro: e})
  })
});

//not done
router.get('/api/distritos', function(req, res, next) {
  Cidades.listar().then(dados=>{
    res.status(200).jsonp(dados)
  })
  .cath(e => { 
    res.status(500).jsonp({erro: e})
  })
});

//not done
router.get('/api/ligacoes', function(req, res, next) {
  if (! req.param('origem')==='') {
    Ligacoes.procura_origem().then(dados=>{
    delete dados.origem
    delete dados.distancia
    var newjson = {}
    dados.forEach(element => {
      var dest = element.destino
      nome = await Cidades.procura_id(dest).nome
      element.push({nomeDestino: nome})
      newjson.push(element)
    });
    res.status(200).jsonp(newjson)
    }).cath(e => { 
      res.status(500).jsonp({erro: e})
    })
  //?distrito=DDDD
  }else{
    Ligacoes.procura_dist().then(dados=>{
    var newjson = {}
    dados.forEach(element => {
      var dest = element.destino
      var orig = element.origem
      nomeor = await Cidades.procura_id(orig).nome
      nomedest = await Cidades.procura_id(dest).nome
      element.push({nomeDestino: nomedest, nomeOrigem:nomeor})
      newjson.push(element)
    });
    res.status(200).jsonp(newjson)
    }).cath(e => { 
      res.status(500).jsonp({erro: e})
    })
  }

});




module.exports = router;
