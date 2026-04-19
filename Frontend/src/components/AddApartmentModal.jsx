import {useEffect, useState} from 'react';

const AddApartmentModal=({setNewApartment})=>{
    const [apartmentName,setApartmentName]=useState("");
    const [address,setAddress]=useState("");
    const [bed,setBed]=useState();
    const [bath,setBath]=useState();
    const [price,setPrice]=useState();
    useEffect(()=>{
        setNewApartment((prev)=>({...prev,"name":apartmentName,"address":address,"bed":bed,
            "bath":bath,"price":price
        }));

    },[apartmentName,address,bed,bath,price])
    return(
        <div>
            <p>Add Apartment Details</p>
            <label htmlFor="apartmentName">Apartment Name</label>
            <input type="text" name="apartmentName" id="apartmentName" onChange={e=>setApartmentName(e.target.value)} required></input>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" onChange={e=>setAddress(e.target.value)} required></input>
            <label htmlFor="price">Monthly Rent$</label>
            <input type="number" name="price" id="price" onChange={e=>setPrice(e.target.value)} required></input>
            <label htmlFor="bed">Bed</label>
            <input type="number" name="bed" id="bed" onChange={e=>setBed(e.target.value)} required />
            <label htmlFor="bath">Bath</label>
            <input type="number" name="bath" id="bath" onChange={e=>setBath(e.target.value)} required />
        </div>
    )
}
export default AddApartmentModal