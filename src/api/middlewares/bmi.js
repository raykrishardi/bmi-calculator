// Import createCustomError function to create a custom JS error object and import BMI class to calculate the BMI
const { createCustomError } = require('../../utils/CustomAPIError')
const BMI = require('../../models/BMI')

// HTTP GET / handler which returns the BMI value and label
const getBMI = (req, res, next) => {
 // Get height and weight from query params
 const { height, weight } = req.query

 // Parse height and weight as floating point number
 const heightInCm = parseFloat(height)
 const weightInKg = parseFloat(weight)

 // Check whether the given height and weight exist and they are valid
 // If they are NOT valid then pass the custom JS error object to the default custom error handler
 // Assumptions:
 // 1. Height should be a positive integer >= 1 and <= 350
 // 2. Weight could be a floating point number > 0 and <= 800
 if (!BMI.isValidHeightInCm(heightInCm) || !BMI.isValidWeightInKg(weightInKg)) {
  return next(createCustomError(`Missing/invalid query params ('height' (cm) must be an INTEGER >= ${BMI.minHeightInCm} and <= ${BMI.maxHeightInCm} and/or 'weight' (kg) must be a FLOAT > ${BMI.minWeightInKg} and <= ${BMI.maxWeightInKg})`, 400))
 } 

 // Get the BMI object
 const bmi = new BMI(weightInKg, heightInCm)

 // Return the BMI object as HTTP response
 return res.status(200).json({success: true, bmi: bmi.bmi, label: bmi.label})
}

module.exports = {
 getBMI
}