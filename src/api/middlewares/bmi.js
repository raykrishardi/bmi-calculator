// Import custom error to create a custom JS error object
const { createCustomError } = require('../../utils/CustomAPIError')

const getBMI = (req, res, next) => {
 const { height, weight } = req.query

 if (isNaN(height) || isNaN(weight)) {
  return next(createCustomError('Missing/invalid query params (height and/or weight)', 400))
 } 


 return res.status(200).json({success: true})
}

module.exports = {
 getBMI
}