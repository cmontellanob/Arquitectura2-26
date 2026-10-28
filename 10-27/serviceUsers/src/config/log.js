var winston = require('winston');
const env = process.env.NODE_ENV;
const logDir = 'logs';
const fs = require('fs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const now = new Date();
var logger = new(winston.Logger)({
    transports: [

        new(winston.transports.Console)({ level: 'warn' }),
        new(winston.transports.File)({ filename: 'somefile.log', level: 'error' }),

        new winston.transports.File({
            name: 'error-file',
            filename: './logs/exceptions.log',
            level: 'error',
            json: false
        }),
        new winston.transports.File({
            name: 'information-file',
            filename: './logs/user.log',
            level: env === 'development' ? 'verbose' : 'info',
            json: false
        }),
      
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message);
        console.log('message=', message);
    }
};