import { useState } from "react";
import Apartment from './ApartmentCard';
const ApartmentList=({apartments,onSelect})=>{
    return (
        apartments.map((apartment)=>{
            return (<Apartment key={apartment.id} apartment={apartment} onClick={()=>onSelect(apartment)}/>)
        })
    )
}

export default ApartmentList