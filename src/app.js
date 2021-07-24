// Get/Load main config file
const config = require('./config/config')

// Import NPM modules
const express = require('express')
const logger = require('./utils/logger') // Winston logger
const morgan = require('morgan') // Morgan HTTP request logger

// Get route handlers
const bmiRouteHandler = require('./api/routes/bmi')
const defaultRouteHandler = require('./api/middlewares/default')
const defaultErrorHandler = require('./api/middlewares/error')

// Express app
const app = express()

// Send standard Apache combined log output from Morgan to Winston log file
app.use(morgan("combined", { "stream": logger.stream }))

// Bind custom middleware/route handlers
app.use(bmiRouteHandler)

// Default route and default error handler
app.use(defaultRouteHandler)
app.use(defaultErrorHandler)

// Server listening on certain port depending on the environment variable or CLI arg
app.listen(config.app.port, () => {
 logger.info(`Server is listening on port ${config.app.port}`)
})

module.exports = app