var app = require('./app');
var port = process.env.PORT || 3000;
var logger = require('./config/log');



var server = app.listen(port, function() {
  console.log('Express server for Users escuchando on port ' + port);
  logger.info("Express server for Users listening on port" + port);

});