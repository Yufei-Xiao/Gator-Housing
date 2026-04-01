import { useState } from "react";
import '../css/ApartmentModal.css';
const ApartmentModal=({apartment,onClose})=>{
    const {name,distance,bed,bath,price,rating,reviews}=apartment;
    return (
        <div className="apartment-modal">
            <button onClick={onClose}>Close</button>
            <h2>{name}</h2>
            <p>{distance}</p>
            <p>{bed}bed/{bath}bath</p>
            <p>${price}/month</p>
            <p>{rating}</p>
            <p>{reviews} reviews</p>
        </div>
    
    )
}

export default ApartmentModal