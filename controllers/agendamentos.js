module.exports.agendamentos = function(application, req , res){
  console.log('entrou aqui api');
    // Estrutara de retorno
    var retorno = {
        status : {
            code : "" ,
            text : ""
        }
    };

    //verifica se o usuário já esta logado
    if(req.session.autorizado){
      //recupera data atualiz e converte para pt-BR
      var data = new Date();
      var dia     = data.getDate();
      if(dia < 10) dia = '0'+dia
      var mes     = data.getMonth() + 1;
      if(mes < 10) mes = '0'+mes
      var ano    = data.getFullYear();
      var diaAtual = dia+'/'+mes+'/'+ano;
      console.log('dia atual', diaAtual);
      // Recupera conexão
      var connection = application.config.dbConnection;

      // Instancia a classe ConabilDAO
      var DuoDAO = new application.models.DuoDAO(connection);

      // Tabela onde será feita a consulta
      var tabela = "agendamentos a, usuarios b, tipoAgendamentos c, localAgendamento d";

      //campos para pesquisa
      var campos = 'a.data, a.turno, d.nomeLocalAgendamento, a.status, c.nomeTipoAgendamento';

      // Condicao da pesquisa
      var condicao = 'a.usuarios_idUsuarios = b.idUsuarios AND a.tipoAgendamentos_idTipoAgendamento = c.idTipoAgendamento AND d.idLocalAgendamento = a.localAgendamento_idLocalAgendamento ' +
                      'AND b.idUsuarios = '+req.session.user.idLogin;

      // Chama a função de Consulta
      DuoDAO.consultaDetalhada(tabela, campos, condicao, function(error , result){
          // Verifica se ocorreu erro ao efetuar a consulta
          if(error){
              // Se sim monsta o erro e o retorna
              console.log(error);
              DuoDAO.fechaConexao();
              retorno.status.code  = 600;
              retorno.status.text  = "Ocorreu um erro inexperado, Por favor tente novamente mais tarde.";
              res.json(retorno);
          }else{
              // Se não verifica retorno da consulta
              if(result.length <= 0 ){
                  DuoDAO.fechaConexao();
                  // Se não achar nenhum registro monta o retorno de erro
                  retorno.status.code  = 204;
                  retorno.status.text  = "Não existem agendamentos para esse usuário.";
                  res.json(retorno);
              }else{
                  DuoDAO.fechaConexao();
                  retorno.data = result;
                  // Monta e envia a mensagem de retorno
                  retorno.status.code  = 200;
                  retorno.status.text  = "OK";
                  res.json(retorno);
              }
          }
      });
    }else{
        // Se não monta o erro e o retorna
        retorno.status.code  = 403;
        retorno.status.text  = "Usuário não logado ou não permitido para esse acesso.";
        res.json(retorno);
    }
}

//Busca datas indisponiveis
module.exports.buscaDatasAgendamento = function(application, req , res){
  console.log('req.body', req.body);
    // Estrutara de retorno
    var retorno = {
        status : {
            code : "" ,
            text : ""
        }
    };

    //verifica se o usuário já esta logado
    if(req.session.autorizado){
      // Recupera conexão
      var connection = application.config.dbConnection;

      // Instancia a classe ConabilDAO
      var DuoDAO = new application.models.DuoDAO(connection);

      // Tabela onde será feita a consulta
      var tabela = "agendamentos";

      //campos para pesquisa
      var campos = 'data';

      var condicao = 'localAgendamento_idLocalAgendamento = ' + req.body.id;

      // Chama a função de Consulta
      DuoDAO.consultaDetalhada(tabela, campos, condicao, function(error , result){
          // Verifica se ocorreu erro ao efetuar a consulta
          if(error){
              // Se sim monsta o erro e o retorna
              console.log(error);
              DuoDAO.fechaConexao();
              retorno.status.code  = 600;
              retorno.status.text  = "Ocorreu um erro inexperado, Por favor tente novamente mais tarde.";
              res.json(retorno);
          }else{
              // Se não verifica retorno da consulta
              if(result.length <= 0 ){
                  DuoDAO.fechaConexao();
                  // Se não achar nenhum registro monta o retorno de erro
                  retorno.status.code  = 204;
                  retorno.status.text  = "Não existem agendamentos para esse usuário.";
                  res.json(retorno);
              }else{
                  DuoDAO.fechaConexao();
                  retorno.data = result;
                  // Monta e envia a mensagem de retorno
                  retorno.status.code  = 200;
                  retorno.status.text  = "OK";
                  res.json(retorno);
              }
          }
      });
    }else{
        // Se não monta o erro e o retorna
        retorno.status.code  = 403;
        retorno.status.text  = "Usuário não logado ou não permitido para esse acesso.";
        res.json(retorno);
    }
}

module.exports.buscaTiposAgendamento = function(application, req , res){
  console.log('entrou aqui buscaDatasAgendamento');
    // Estrutara de retorno
    var retorno = {
        status : {
            code : "" ,
            text : ""
        }
    };

    //verifica se o usuário já esta logado
    if(req.session.autorizado){
      // Recupera conexão
      var connection = application.config.dbConnection;

      // Instancia a classe ConabilDAO
      var DuoDAO = new application.models.DuoDAO(connection);

      // Tabela onde será feita a consulta
      var tabela = "tipoagendamentos";

      //campos para pesquisa
      var campos = '*';

      // Chama a função de Consulta
      DuoDAO.consultaTodos(tabela, campos, function(error , result){
          // Verifica se ocorreu erro ao efetuar a consulta
          if(error){
              // Se sim monsta o erro e o retorna
              console.log(error);
              DuoDAO.fechaConexao();
              retorno.status.code  = 600;
              retorno.status.text  = "Ocorreu um erro inexperado, Por favor tente novamente mais tarde.";
              res.json(retorno);
          }else{
              // Se não verifica retorno da consulta
              if(result.length <= 0 ){
                  DuoDAO.fechaConexao();
                  // Se não achar nenhum registro monta o retorno de erro
                  retorno.status.code  = 204;
                  retorno.status.text  = "Não existem agendamentos para esse usuário.";
                  res.json(retorno);
              }else{
                  DuoDAO.fechaConexao();
                  retorno.data = result;
                  // Monta e envia a mensagem de retorno
                  retorno.status.code  = 200;
                  retorno.status.text  = "OK";
                  res.json(retorno);
              }
          }
      });
    }else{
        // Se não monta o erro e o retorna
        retorno.status.code  = 403;
        retorno.status.text  = "Usuário não logado ou não permitido para esse acesso.";
        res.json(retorno);
    }
}

module.exports.verificaLocal = function(application, req , res){
  console.log('entrou aqui buscaDatasAgendamento', req);
  // Estrutara de retorno
  var retorno = {
      status : {
          code : "" ,
          text : ""
      }
  };

  //verifica se o usuário já esta logado
  if(req.session.autorizado){
    // Recupera conexão
    var connection = application.config.dbConnection;

    // Instancia a classe ConabilDAO
    var DuoDAO = new application.models.DuoDAO(connection);

    // Tabela onde será feita a consulta
    var tabela = "localagendamento";

    //campos para pesquisa
    var campos = '*';

    var condicao = 'tipoAgendamentos_idTipoAgendamento = ' + req.body.id;

    // Chama a função de Consulta
    DuoDAO.consultaDetalhada(tabela, campos, condicao, function(error , result){
        // Verifica se ocorreu erro ao efetuar a consulta
        if(error){
            // Se sim monsta o erro e o retorna
            console.log(error);
            DuoDAO.fechaConexao();
            retorno.status.code  = 600;
            retorno.status.text  = "Ocorreu um erro inexperado, Por favor tente novamente mais tarde.";
            res.json(retorno);
        }else{
            // Se não verifica retorno da consulta
            if(result.length <= 0 ){
                DuoDAO.fechaConexao();
                // Se não achar nenhum registro monta o retorno de erro
                retorno.status.code  = 204;
                retorno.status.text  = "Não existem agendamentos para esse usuário.";
                res.json(retorno);
            }else{
                DuoDAO.fechaConexao();
                retorno.data = result;
                // Monta e envia a mensagem de retorno
                retorno.status.code  = 200;
                retorno.status.text  = "OK";
                res.json(retorno);
            }
        }
    });
  }else{
      // Se não monta o erro e o retorna
      retorno.status.code  = 403;
      retorno.status.text  = "Usuário não logado ou não permitido para esse acesso.";
      res.json(retorno);
  }
}

module.exports.salvarAgendamento = function(application, req , res){
  console.log('entrou aqui buscaDatasAgendamento', req.body.data);
  // Estrutara de retorno
  var retorno = {
      status : {
          code : "" ,
          text : ""
      }
  };

  //verifica se o usuário já esta logado
  if(req.session.autorizado){
    // Recupera conexão
    var connection = application.config.dbConnection;

    // Instancia a classe ConabilDAO
    var DuoDAO = new application.models.DuoDAO(connection);

    // Tabela onde será feita a consulta
    var tabela = "agendamentos";

    // Dados a serem inseridos
    var dados = {
      data: req.body.data,
      turno: req.body.turno,
      status: req.body.status,
      localAgendamento_idLocalAgendamento: req.body.localAgendamento,
      tipoAgendamentos_idTipoAgendamento: req.body.tipoAgendamentos,
      usuarios_idUsuarios: req.session.user.idLogin
    }

                console.log('dados', dados);

    // Chama a função de Consulta
    DuoDAO.inserir(tabela, dados, function(error , result){
        // Verifica se ocorreu erro ao efetuar a consulta
        if(error){
            // Se sim monsta o erro e o retorna
            console.log(error);
            DuoDAO.fechaConexao();
            retorno.status.code  = 600;
            retorno.status.text  = "Ocorreu um erro inexperado, Por favor tente novamente mais tarde.";
            res.json(retorno);
        }else{
            // Se não verifica retorno da consulta
            if(result.length <= 0 ){
                DuoDAO.fechaConexao();
                // Se não achar nenhum registro monta o retorno de erro
                retorno.status.code  = 204;
                retorno.status.text  = "Não existem agendamentos para esse usuário.";
                res.json(retorno);
            }else{
                DuoDAO.fechaConexao();
                retorno.data = result;
                // Monta e envia a mensagem de retorno
                retorno.status.code  = 200;
                retorno.status.text  = "OK";
                res.json(retorno);
            }
        }
    });
  }else{
      // Se não monta o erro e o retorna
      retorno.status.code  = 403;
      retorno.status.text  = "Usuário não logado ou não permitido para esse acesso.";
      res.json(retorno);
  }
}
