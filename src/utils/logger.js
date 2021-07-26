// Import winston logger
// Also get a reference to the config file for configuring the winston logger based on env or cli args
const winston = require('winston');
const winstonEcsFormat = require('@elastic/ecs-winston-format')
const config = require('../config/config')

// Winston logger
// Using NPM logging levels
const logger = winston.createLogger({
  level: config.app.logs.level,
  levels: winston.config.npm.levels,
  format: winstonEcsFormat(),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger