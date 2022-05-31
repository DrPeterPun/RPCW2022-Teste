var express = require('express');
var router = express.Router();
var axios = require('axios');
const { response } = require('../app');
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNjcyNSwiZXhwIjoxNjU0MDQ1NTI1fQ.uNrZJ9sED6Hw1Yk3WNrxF68025TNzWxylpG78qDQo_a-6hkeF4wGEglAY3rQmoUzUsZd9WoIuQ1KW8KzntDIg9uo-McdFa9Oj12-k15Ec6jzvBAtX1wO0fuAMlk0JaX07eA9iY1ce7_TagCRwTABlC5f9HgK-dzdN8wpIvxPj6hUALhhvGjzCuSyUq7e0rmvRAiULhxJp23i-WWbU90C7cR5pMXXJkFjHnznI_3QaC2u3U3zJLWEQrtIPt6vp8uL5Eea9ReG5g-y8n_0fQHtvaepz1laaJZzVrKy_pSqVY_zp8H0v0Guivx1OpI-kN8kxYvgqhjVJ11hfXY7OmGrcQ"
//const token = axios.post("http://clav-api.di.uminho.pt/v2/users/login",{username:"rpcw2022@gmail.com", password:"2022"},
//  {headers: {
//    'content-type': 'application/json'
//  }})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('main', { title: 'Pagina principal'})
});

/* GET home page. */
router.get('/classes', function(req, res, next) {
  classe = axios.get("http://clav-api.di.uminho.pt/v2/classes" , {params : { nivel:1, token: token}}).then(response => {
    console.log(response.data)
    res.render('classes', { title: 'Express', classes: response.data})
  })
});

router.get('/classes/:id', function(req, res, next) {
  console.log("classe :")
  console.log(req.params.id)
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id, {params : { token: token, }}).then(response => {

    const titulo = response.data.titulo
    const codigo = response.data.codigo
    const id = response.data.id
    const status = response.data.status
    const nivel = response.data.nivel
    const filhos = response.data.filhos
    const desc = response.data.descricao
    const notasAp = response.data.notasAp
    const notasEx = response.data.notasEx
    //console.log(titulo + " " + codigo + " " +id + " " +status + " " +nivel)
   
    list = []

    console.log("processos")
    console.log(response.data.processosRelacionados)
    n = 0
    if (response.data.processosRelacionados){
      n = response.data.processosRelacionados.length
    }
    for (let index = 0; index < n; index++) {
      const element = response.data.processosRelacionados[index];
      console.log(element.idRel)
      if (element.idRel=='eCruzadoCom'   || element.idRel=='eComplementarDe' || 
          element.idRel=='eSuplementoDe' || element.idRel=='SuplementoPara') {
        list.push(element)
      }
    }
    console.log(list)
    
    //console.log("classe inteira")
    //console.log(response.data)
    
    //console.log(desc)
    i = (codigo.lastIndexOf('.'))
    prev = codigo.substring(0,i)

    res.render('classe', { title: titulo, codigo:codigo, id: id, status:status, nivel:nivel, filhos:filhos, notasAp: notasAp, notasEx: notasEx, desc: desc, prev:prev, rel:list})
     
  })
});

router.get('/termos', function(req, res, next) {
  classe = axios.get("http://clav-api.di.uminho.pt/v2/termosIndice" , {params : {token: token}}).then(response => {
    console.log(response.data)
    res.render('termos', {title: 'Express', termos: response.data})
  })
});


module.exports = router;
