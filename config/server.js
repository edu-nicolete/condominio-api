var express = require('express');
var consign = require('consign');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configura o middleware express-session */
app.use(expressSession({
	secret: 'adohnaódfknhavnbafjaebn',
	resave: false,
	saveUninitialized: false
}));


app.use(function(req, res, next){

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()

	.include('./routes')
	.then('./models')
	.then('./controllers')
	.then('./config/dbConnection.js')
	.into(app);

/* exportar o objeto app */
module.exports = app;
