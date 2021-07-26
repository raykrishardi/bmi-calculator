const config = require('../../config/config')
const client = require('prom-client')

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
 app: config.app.logs.serviceName
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

// HTTP GET /metrics handler which returns the prometheus metrics
const getMetrics = async (req, res) => {
 // Return all metrics the Prometheus exposition format
 res.setHeader('Content-Type', register.contentType)
 res.end(await register.metrics())
}

module.exports = {
 getMetrics
}