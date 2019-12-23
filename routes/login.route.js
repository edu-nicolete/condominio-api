const express = require('express');
const app = express();
const loginRoutes = express.Router();

// Require Login model in our routes module
const config = require('../DB');
const conexaoMySQL = config.teste(function(connection){
  return this._connection = connection();
});

// Defined get data(index or listing) route
loginRoutes.route('/login').post(function (req, res) {
  console.log('req', req);
  var query = 'select * from ' + req.body.tabelas +' WHERE ' + req.body.campos
  + ' and a.usuarios_idUsuarios = b.idUsuarios ';
  conexaoMySQL.query(query, function(error, result, fields){
    if(error){ 
      console.log(error);
    }else{
      if(result.length > 0){
        res.json(true);
      }else{
        res.json(false);
      }
    }
  })
});

module.exports = loginRoutes;