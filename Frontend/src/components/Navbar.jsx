import {useState} from "react"


export default function Navbar({setSelected}){
    
    return (
        <div className="navbar">
        <h1>Gator Housing</h1>
        <p>UF Student Housing Reviews</p>
        <button onClick={()=>setSelected(true)}>Submit Review</button>
        </div>
    )
}