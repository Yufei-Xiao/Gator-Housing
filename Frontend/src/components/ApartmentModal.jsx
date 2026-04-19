import { useState } from "react";
import '../css/ApartmentModal.css';
import ReviewCard from "./ReviewCard";
const ApartmentModal=({apartment,reviews,onClose})=>{
    const {name,address,bed,bath,price,rating}=apartment;
    return (
        <div className="apartment-modal">
            <button onClick={onClose}>Close</button>
            <h2>{name}</h2>
            <p>{address}</p>
            <p>{bed}bed/{bath}bath</p>
            <p>${price}/month</p>
            <p>{rating}</p>
            <p>Reviews</p>
            {reviews.map(review=>
                <ReviewCard key={review.id} review={review}/>
            )}
        </div>
    
    )
}

export default ApartmentModal