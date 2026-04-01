import {useState} from "react"


const Searchbar=({name,setName,bed,setBed,price,setPrice})=>{
    const handleNameChange=(event)=>{
        setName(event.target.value);
    }
    const handleBedChange=(event)=>{
        if(event.target.value==="All"){
            setBed("All");
        }
        else{
            setBed(parseInt(event.target.value));
        }

    }
    const handlePriceChange=(event)=>{
        setPrice(event.target.value);
    }
    return (
        <div className="search-bar">
        <input type="text" placeholder="Search apartments by name" onChange={handleNameChange} value={name}/>
        <select id="bed-select" onChange={handleBedChange}>
            <option>All</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
        </select>
        <input type="number" placeholder="$ per month" onChange={handlePriceChange} value={price}/>
        </div>
    )
}

export default Searchbar