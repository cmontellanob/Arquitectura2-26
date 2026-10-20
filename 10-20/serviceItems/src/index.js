const app = require('./config/server');
const winston = require('winston');
var Connection = require('./config/dbConnection').pool;
var logger = require('./config/log');
require('./app/routes/controller')(app);

// starting the server
app.listen(app.get('port'), () => {
    console.log('Express server for Items listening on port', app.get('port'));
    logger.info("Express server for Items listening on port" + app.get('port'));
});