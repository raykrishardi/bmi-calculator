// Create express router
const express = require('express')
const router = express.Router()

// Get the corresponding route handler
const { getMetrics } = require('../middlewares/prom-metrics')

// Handle GET request for the specified path
const routePath = '/metrics'
router.route(routePath).get(getMetrics)

module.exports = router