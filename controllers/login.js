module.exports.login = function(application, req , res){
    /**
     * ****** Função Login
     * Os campos login e senha são obrigatorios
     *
     * Estrutura dos dados de entrada:
     *  {
     *      "login" : '' ,
     *      "Senha" : ''
     *  }
     */
    // Estrutara de retorno
    var retorno = {
        status : {
            code : "" ,
            text : ""
        }
    };

    // //verifica se o usuário já esta logado
    if(req.session.autorizado === undefined){
      console.log('req.body', req.body);
        // Recupera parametros recebidos
        var login = req.body.login;
        var senha = req.body.senha;

        // Verifica se o campo Login foi informado
        if(login === undefined || login === null || login === "" || login === 0 ){

            // Se não monta o erro e retorna
            retorno.status.code  = 605;
            retorno.status.text  = "O campo login é de Preenchimento Obrigatorio.";
            res.json(retorno);

        // Verifica se o campo senha foi informado
        }else if (senha === undefined || senha === null || senha === "" || senha === 0){

            // Se não monta o erro e retorna
            retorno.status.code  = 605;
            retorno.status.text  = "O campo senha é de Preenchimento Obrigatorio.";
            res.json(retorno);

        }else{

            // Recupera conexão
            var connection = application.config.dbConnection;

            // Instancia a classe ConabilDAO
            var DuoDAO = new application.models.DuoDAO(connection);

            // Tabela onde será feita a consulta
            var tabela = "login a, usuarios b";

            // Condicao da pesqusa
            var condicao = 'b.cpf = "' + login +
            '" and a.senha = "' + senha + '"'

            // Chama a função de Consulta
            DuoDAO.consultaLogin(tabela, condicao, function(error , result){
              console.log('result', result);

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
                        retorno.status.code  = 605;
                        retorno.status.text  = "Login e senha inválidos.";
                        res.json(retorno);

                    }else{

                        DuoDAO.fechaConexao();
                        // Monta sessão do usuário
                        console.log('login 1',req.session);
                        req.session.autorizado = true;
                        // Atribui 8h de sessão
                        var hour = 1000 * 60 * 60 * 8 ;
                        req.session.cookie.expires = new Date(Date.now() + hour);
                        req.session.cookie.maxAge = hour;
                        req.session.user = result[0];;
                        // Salva a sessão
                        req.session.save();

                        console.log('login 2',req.session);

                        retorno.data = req.session.user;

                        // Monta e envia a mensagem de retorno
                        retorno.status.code  = 200;
                        retorno.status.text  = "OK";
                        res.json(retorno);

                    }
                }
            });
        }
    }else{
        // Se não monta o erro e o retorna
        retorno.status.code  = 610;
        retorno.status.text  = "Usuário já está logado.";
        res.json(retorno);
    }
}

module.exports.verificaLogin = function(application, req , res){
    /**
     * ****** Função Verifica Login */
    // Estrutara de retorno
    var retorno = {
        data : {},
        status : Boolean
    };

    if(req.session.autorizado === undefined){
        retorno.status = false;
    }else{
        retorno.data = req.session.user;
        retorno.status = true;
    }

    res.send(retorno);
}

module.exports.logout = function(application , req , res){
    //*** Função Logout */
    // Estrutara de retorno
    var retorno = {
        status : Boolean
    };

    req.session.destroy();
    retorno.status = true;


    res.send(retorno);


}
