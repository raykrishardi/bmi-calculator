// BMI class that provides static functions to validate height and weight as well as generate the BMI value and label
class BMI {
 // Min and max height (cm) for validation
 static minHeightInCm = 1 // Height must be a positive integer
 static maxHeightInCm = 350

 // Min and max weight (kg) for validation
 static minWeightInKg = 0 // Consider smallest baby weight (245 grams (i.e. 0.245 kg))
 static maxWeightInKg = 800 // Consider heaviest human weight (635 kg)

 // Constructor and instance variables
 constructor(weightInKg, heightInCm) {
  this.bmi = this.getBMI(weightInKg, heightInCm)
  this.label = this.getLabelFromBMI()
 }

 // Get BMI as floating point number rounded to 1 decimal places
 // BMI = weight(kg)/height(m)^2
 getBMI(weightInKg, heightInCm) {
  const heightInM = heightInCm/100
  const bmi = weightInKg/Math.pow(heightInM, 2)
  return parseFloat(bmi.toFixed(1))
 }

 // Get label (overweight, normal, and underweight) based on the BMI value
 getLabelFromBMI() {
  let label = ''

  if (this.bmi >= 25) {
   label = 'overweight'
  } else if (this.bmi >= 18.5 && this.bmi < 25) {
   label = 'normal'
  } else {
   label = 'underweight'
  }

  return label
 }

 // Static function to check whether height (cm) is valid or not
 // Assumptions:
 // 1. Height should be a positive integer >= 1 and <= 350
 static isValidHeightInCm(heightInCm) {
  return (!Number.isNaN(heightInCm) && Number.isInteger(heightInCm) && heightInCm >= BMI.minHeightInCm && heightInCm <= BMI.maxHeightInCm)
 }

 // Static function to check whether weight (kg) is valid or not
 // Assumptions:
 // 1. Weight could be a floating point number > 0 and <= 800
 static isValidWeightInKg(weightInKg) {
  return (!Number.isNaN(weightInKg) && weightInKg > BMI.minWeightInKg && weightInKg <= BMI.maxWeightInKg)
 }
}

module.exports = BMI