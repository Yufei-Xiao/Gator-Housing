import {useEffect, useState} from 'react';

const ReviewModal=({apartments,setUpdatedApartment,onClose,onSubmit})=>{
    //get the id of the apartment and create a newReview object to pass in the onSubmit function
    const [selectedApartment,setSelectedApartment]=useState("");//string 
    const [reviewer,setReviewer]=useState("");
    const [rating,setRating]=useState();
    const [comment,setComment]=useState("");
    const [review,setReview]=useState({});
    const handleSubmit=(event)=>{
        event.preventDefault();
        onSubmit(review);
        onClose();
    }
    useEffect(()=>{
        try{
            const apartment=apartments.find(a=>a.name===selectedApartment);
            setUpdatedApartment(apartment);
            const newReview={"apartment_id":apartment.id,"reviewer":reviewer,"rating":rating,"comment":comment};
            setReview(newReview);
        }catch(error){
            console.log("cannot find apartment",error)
        }
    },[selectedApartment,reviewer,rating,comment])
    
    return (
        <div className="submit-review-modal">
        <h1>Submit a Review</h1>
        <button onClick={onClose}>X</button>
        <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="apartment-select">Apartment</label>
        <select id="apartment-select" name="apartment-select" value={selectedApartment} onChange={e=>setSelectedApartment(e.target.value)} required> 
            <option>Select an apartment</option>
            {apartments.map((apartment)=>
                (<option key={apartment.id}>{apartment.name}</option>)
            )}
        </select>
        <label htmlFor="reviewer">Your name</label>
        <input type="text" name="reviewer" id="reviewer" onChange={e=>setReviewer(e.target.value)} required></input>
        <label htmlFor="rating">Rating</label>
        <input type="number" name="rating" id="rating" onChange={e=>setRating(e.target.value)} required></input>
        <label htmlFor="comment">Your review</label>
        <input type="text" name="comment" id="comment" onChange={e=>setComment(e.target.value)} required></input>
        <input type="submit" value="Submit Review"></input>
        </form>
        </div>
    )
}

export default ReviewModal