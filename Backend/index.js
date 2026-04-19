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
app.post('/apartments',(request,response)=>{
  Apartment.create(request.body)
  .then(newApartment=>response.json(newApartment))
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
app.post('/reviews',async(request,response)=>{
  const newReview=await Review.create(request.body);
  const apartment=await Apartment.findById(newReview.apartment_id);
  const oldrating=apartment.rating;
  const oldreviews=apartment.reviews;
  const newreviews=oldreviews+1;
  const newrating=(oldrating*oldreviews+newReview.rating)/newreviews;
  apartment.reviews = newreviews;
  apartment.rating = newrating;
  await apartment.save();
  response.json(newReview);
})


