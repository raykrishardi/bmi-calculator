// Get/Load main config file
const config = require('./config/config')

// Import NPM modules
const express = require('express')
const logger = require('./utils/logger') // Winston logger
const morgan = require('morgan') // Morgan HTTP request logger
const morganEcsFormat = require('@elastic/ecs-morgan-format')

// Get route handlers
const bmiRouteHandler = require('./api/routes/bmi')
const promMetricsRouteHandler = require('./api/routes/prom-metrics')
const defaultRouteHandler = require('./api/middlewares/default')
const defaultErrorHandler = require('./api/middlewares/error')

// Express app
const app = express()

// Get ECS (Elastic Common Schema) format for morgan logging
app.use(morgan(morganEcsFormat()))

// Bind custom middleware/route handlers
app.use(bmiRouteHandler)
app.use(promMetricsRouteHandler)

// Default route and default error handler
app.use(defaultRouteHandler)
app.use(defaultErrorHandler)

// Server listening on certain port depending on the environment variable or CLI arg
app.listen(config.app.port, () => {
 logger.info(`Server is listening on port ${config.app.port}`)
})

module.exports = app