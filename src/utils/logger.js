// Import winston and winston-daily-rotate-file which will be used for logging to a file and controlling the log retention and rotation policy
// Also get a reference to the config file for configuring the winston logger based on env or cli args
const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('../config/config')

// Array of winston transports which are essentially a storage device for your logs
const transports = [];

// Setup daily rotated log files using "winston-daily-rotate-file"
// Log file name will be generated from logs.serviceName and current date (YYYY-MM-DD format)
// Rotated log files will be archived using gzip
// transports.push(new winston.transports.DailyRotateFile({
//   dirname: config.app.logs.dirPath,
//   filename: config.app.logs.serviceName + '-%DATE%.log',
//   datePattern: 'YYYY-MM-DD',
//   zippedArchive: true,
//   maxSize: config.app.logs.retentionMaxFileSize,
//   maxFiles: config.app.logs.retentionDays
// }))

//
// Log to the `console`
// with the colorized simple format
//
transports.push(new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
}));

// Winston logger will be integrated with Morgan
// Using NPM logging levels
const logger = winston.createLogger({
  level: config.app.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({
      stack: true
    }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: {
    service: config.app.logs.serviceName
  },
  transports
});

module.exports = logger