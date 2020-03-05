function DuoDAO(connection){
	this._connection = connection();
}

DuoDAO.prototype.consultaLogin = function(tabela, condicao, callback){
	this._connection.query('SELECT * FROM ' + tabela + ' WHERE ' + condicao + 'AND a.usuarios_idUsuarios = b.idUsuarios', callback)
}

DuoDAO.prototype.consultaDetalhada = function(tabela , campos, condicao, callback){
	this._connection.query('SELECT '+ campos +' FROM ' + tabela + ' WHERE ' + condicao, callback);
}

DuoDAO.prototype.consultaTodos = function(tabela , campos, callback){
	this._connection.query('select '+ campos +' from ' + tabela, callback);
}

DuoDAO.prototype.inserir = function(tabela ,  dados , callback){
	console.log('dados', dados);
	this._connection.query("insert into "+ tabela +" set ?", dados , callback);
}

DuoDAO.prototype.atualiza = function(tabela , campos , valores  , condicao ,  callback){
	this._connection.query("update " +tabela + " set "+ campos+" where " + condicao  , valores,  callback);
	this._connection.end(function (erro){
		console.log("Conexão fechada");
	});
}

DuoDAO.prototype.deleta = function(tabela , condicao ,  callback){
	this._connection.query("delete from " +tabela + " where "+ condicao  ,  callback);
	this._connection.end(function (erro){
		console.log("Conexão fechada");
	});
}

DuoDAO.prototype.fechaConexao =  function(){
	this._connection.end(function (erro){
		console.log("fecha Conexão fechada");
	});
}

module.exports = function(){
	return DuoDAO;
}
