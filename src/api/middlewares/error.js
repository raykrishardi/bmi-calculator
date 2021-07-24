// Import logger and get reference to the custom error class to differentiate standard and custom error class
const logger = require('../../utils/logger')
const { CustomAPIError } = require('../../utils/CustomAPIError')

const defaultErrorHandler = (err, req, res, next) => {
    // Log the error
    logger.error(err)

    // If the error is the custom error then simply return the custom error's status code and message
    if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ success: false, message: err.message })
    }
  
    // For other application related errors
    return res.status(500).json({ success: false, message: 'Something went wrong, please try again...' })
  }
  
module.exports = defaultErrorHandler