var mysql = require('mysql');

var connMySQL = function(){
	console.log('Conexao com bd foi estabelecida');
	return mysql.createConnection({
		host: '127.0.0.1',
    user: 'root',
    password: '123456789',
    database: 'mydb',
		insecureAuth : true
	});
}

module.exports = function () {
	console.log('O autoload carregou o módulo de conexão com bd');
	return connMySQL;
}
