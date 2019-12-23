/*module.exports = {
    DB: 'mongodb://localhost:27017/ng7crud'
};*/

var mysql = require('mysql');
var connMySQL = function(){
    console.log('Conexao com bd foi estabelecida');
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'mydb'
    });
}

module.exports = {
    //console.log('O autoload carregou o módulo de conexão com bd');
    teste: connMySQL
};
