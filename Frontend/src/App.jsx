import { useState ,useEffect} from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import ApartmentList from './components/ApartmentList'
import ApartmentModal from './components/ApartmentModal'
import './App.css'

const App=()=>{
  const [apartments,setApartments]=useState([]);
  const [searchName,setSearchName]=useState("");
  const [bedFilter,setBedFilter]=useState("All");
  const [maxPrice,setMaxPrice]=useState(2000);
  const [filteredApartments,setFilteredApartments]=useState([]);
  const [selectedApartment,setSelectedApartment]=useState(null);

  useEffect(()=>{
    axios.get("http://localhost:3001/data")
    .then(response=>{
      setApartments(response.data);
    })
  },[])
  useEffect(()=>{
      let temp=apartments;
      if(searchName!==""){
        temp=temp.filter((apartment)=>apartment.name.toLowerCase().includes(searchName.trim().toLowerCase()));
      }
      if(bedFilter!=="All"){
        temp=temp.filter((apartment)=>apartment.bed===bedFilter);
      }
      temp=temp.filter((apartment)=>apartment.price<=maxPrice);
      setFilteredApartments(temp);
  },[searchName,bedFilter,maxPrice,apartments]);
  return (
    <>
    <Searchbar name={searchName} setName={setSearchName} bed={bedFilter} setBed={setBedFilter} price={maxPrice} setPrice={setMaxPrice} />
    <h1>{searchName==="" ? apartments.length : filteredApartments.length} apartments found</h1>
    <ApartmentList apartments={filteredApartments} onSelect={(apartment)=>setSelectedApartment(apartment)}/>
    {selectedApartment!==null && <ApartmentModal apartment={selectedApartment} onClose={()=>setSelectedApartment(null)}/>}
    </>
  )
}
  

export default App
