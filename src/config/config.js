// Use convict config schema to structure and validate the JSON config
const convict = require('convict');

// Convict config schema (able to load certain configs from environment variables and CLI args)
const config = convict({
 env: {
  doc: 'The application environment',
  format: ['production', 'development', 'staging', 'qa'],
  default: 'development',
  env: 'NODE_ENV',
  arg: 'nodeEnv'
 },
 app: {
  port: {
   doc: 'The port to bind depending on application environment',
   format: 'port',
   default: 3000,
   env: 'NODE_PORT',
   arg: 'nodePort'
  },
  logs: {
   level: {
    doc: '[Winston NPM] Logging levels (set to use NPM logging levels)',
    format: String,
    default: 'silly',
    env: 'NODE_LOG_LEVEL',
    arg: 'nodeLogLevel'
   },
   serviceName: {
    doc: '[Winston NPM] Service name to be added to each line in the log files',
    format: String,
    default: 'bmi-calculator-service',
    env: 'NODE_LOG_SERVICE_NAME',
    arg: 'nodeLogServiceName'
   },
   dirPath: {
    doc: '[Winston NPM] Logs directory path',
    format: String,
    default: './logs/',
    env: 'NODE_LOG_DIR_PATH',
    arg: 'nodeLogDirPath'
   },
   retentionDays: {
    doc: '[Winston NPM] Logs retention days',
    format: String,
    default: '14d',
    env: 'NODE_LOG_RETENTION_DAYS',
    arg: 'nodeLogRetentionDays'
   },
   retentionMaxFileSize: {
    doc: '[Winston NPM] Maximum size of the file after which it will rotate',
    format: String,
    default: '20m',
    env: 'NODE_LOG_RETENTION_MAX_FILE_SIZE',
    arg: 'nodeLogRetentionMaxFileSize'
   }
  }
 }
});

// Validate the config schema and throws error if config does not conform to schema
config.validate({
 allowed: 'strict'
});

module.exports = config.getProperties(); // so we can operate with a plain old JavaScript object and abstract away convict (optional)