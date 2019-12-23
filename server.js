const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      loginRoute = require('./routes/login.route'),
      app = express();
      
app.use(bodyParser.json());
app.use(cors());
app.use('/login', loginRoute);
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
