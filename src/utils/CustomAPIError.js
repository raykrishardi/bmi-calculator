// Class to create a custom error when a middleware passes next(error)
class CustomAPIError extends Error {
    constructor(message, statusCode) {
      // Call parent class constructor to get access to all variables and methods from parent class
      super(message)
      this.statusCode = statusCode 
    }
  }
  
  // Get an instance of the custom error class
  const createCustomError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode)
  }
  
  // Need to export the class as well to be able to differentiate the custom error class in the default error handler
  module.exports = { createCustomError, CustomAPIError }
  