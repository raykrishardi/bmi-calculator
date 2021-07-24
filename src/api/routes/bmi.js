// Create express router
const express = require('express')
const router = express.Router()

// Get the corresponding route handler
const { getBMI } = require('../middlewares/bmi')

// Handle GET request for the specified path
const routePath = '/'
router.route(routePath).get(getBMI)

module.exports = router