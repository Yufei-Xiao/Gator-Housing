const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const reviewSchema=new mongoose.Schema({
    apartment_id: String,
    reviewer: String,
    rating: Number,
    comment: String

})

module.exports = mongoose.model('review', reviewSchema)