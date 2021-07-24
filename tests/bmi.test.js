const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app')
const should = chai.should();
chai.use(chaiHttp);

const BMI = require('../src/models/BMI')

describe('GET / (get BMI given weight (kg) and height (cm))', () => {
 it('should return success, BMI value, and label', (done) => {
  const testWeightInKg = 70
  const testHeightInCm = 167
  chai.request(app).get(`/?weight=${testWeightInKg}&height=${testHeightInCm}`).end((err, res) => {
   console.log(err)
   console.log(res.body)

   const bmi = new BMI(testWeightInKg, testHeightInCm)
   const expectedResponseBody = {
    success: true,
    bmi: bmi.bmi,
    label: bmi.label
   }

   res.body.should.be.eql(expectedResponseBody)

   done()
  })
 })
})