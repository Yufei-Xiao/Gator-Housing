import {useEffect, useState} from 'react';
import AddApartmentModal from './AddApartmentModal';

const ReviewModal=({apartments,onClose,onSubmit})=>{
    //get the id of the apartment and create a newReview object to pass in the onSubmit function
     
    const [reviewer,setReviewer]=useState("");
    const [rating,setRating]=useState();
    const [comment,setComment]=useState("");
    const [review,setReview]=useState({});
    const [newApartment,setNewApartment]=useState({});
    const [addApartment,setAddApartment]=useState(false);
    const handleSubmit=(event)=>{
        event.preventDefault();
        onSubmit(review,newApartment);
        onClose();
    }
    const handleSelect=(event)=>{
        if(event.target.value===""){
            return;
        }
        if(event.target.value==="+ Add New Apartment"){
            setAddApartment(true);
            setNewApartment(prev=>({...prev,"rating":0,"reviews":0}))
        }else{
            setAddApartment(false);
            const value=event.target.value;
            
            const apartment=apartments.find(a=>a.name===value);
            setReview({...review,"apartment_id":apartment.id})
        }
    }
    useEffect(()=>{
        const newReview={...review,"reviewer":reviewer,"rating":rating,"comment":comment};
        setReview(newReview);
    },[reviewer,rating,comment])
    
    return (
        <div className="submit-review-modal">
        <h1>Submit a Review</h1>
        <button onClick={onClose}>X</button>
        <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="apartment-select">Apartment</label>
        <select id="apartment-select" name="apartment-select" onChange={handleSelect} required> 
            <option value="">Select an apartment</option>
            {apartments.map((apartment)=>
                (<option key={apartment.id}>{apartment.name}</option>)
            )}
            <option>+ Add New Apartment</option>
        </select>
        {addApartment && <AddApartmentModal setNewApartment={setNewApartment}/>}
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