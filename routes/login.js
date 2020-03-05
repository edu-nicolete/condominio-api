/**
 * -- Codes de Retorno
 * 200 - OK
 * 600 - Erro de Banco De Danos
 * 605 - Validação de Campos
 * 610 - Erro Negocial
 * 615 - Necessario efetuar login
 *
 */

module.exports = function(application){

	//application.post('/consulta', function(req, res){
//		application.controllers.contabil.consulta(application , req ,  res);
//	});
//rotas do login
	application.post('/api/logout', function(req, res){
		application.controllers.login.logout(application , req ,  res);
	});

	application.post ('/api/login', function(req, res){
		application.controllers.login.login(application , req ,  res);
	});

	application.post('/api/verificaLogin', function(req, res){
		application.controllers.login.verificaLogin(application , req ,  res);
	});
//fim rotas do login

//rotas agendamentos
	application.post('/api/listaAgendamentos', function(req, res){
		application.controllers.agendamentos.agendamentos(application , req ,  res);
	});

	application.post('/api/buscaDatasAgendamento', function(req, res){
		application.controllers.agendamentos.buscaDatasAgendamento(application , req ,  res);
	});

	application.post('/api/buscaTiposAgendamento', function(req, res){
		application.controllers.agendamentos.buscaTiposAgendamento(application , req ,  res);
	});

	application.post('/api/verificaLocal', function(req, res){
		application.controllers.agendamentos.verificaLocal(application , req ,  res);
	});

	application.post('/api/salvarAgendamento', function(req, res){
		application.controllers.agendamentos.salvarAgendamento(application , req ,  res);
	});
//fim rotas agendamentos
}
