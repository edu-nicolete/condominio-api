/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(process.env.PORT || 4000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
