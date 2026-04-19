require('dotenv').config()
const express = require('express')
const cors=require('cors')
const Apartment = require('./models/apartment')
const Review=require('./models/review')
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/apartments',(request,response)=>{
  Apartment.find({}).then(apartments=>{
    response.json(apartments)
  })
})

app.put('/apartments',(request,response)=>{
  Apartment.updateOne({_id:request.body.id},{ $set: request.body})
  .then(result=>response.json(result))
})
app.get('/reviews',(request,response)=>{
  Review.find({}).then(
    reviews=>{response.json(reviews)}
  )
})
app.get('/reviews/apartment/:apartmentId',(request,response)=>{
  Review.find({apartment_id:request.params.apartmentId}).then(reviews=>{
    response.json(reviews)
  })
})
app.post('/reviews',(request,response)=>{
  Review.create(request.body)
  .then(newReview=>response.json(newReview))
})


