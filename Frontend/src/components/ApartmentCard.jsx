import { useState } from "react";
import '../css/ApartmentCard.css';
const ApartmentCard=({apartment,onClick})=>{
    const {name,distance,bed,bath,price,rating,reviews}=apartment;
    return (
        <div className="apartment-card" onClick={onClick}>
            <h2>{name}</h2>
            <p>{distance}</p>
            <p>{bed}bed/{bath}bath</p>
            <p>${price}/month</p>
            <p>{rating}</p>
            <p>{reviews} reviews</p>
        </div>
    )
}

export default ApartmentCard