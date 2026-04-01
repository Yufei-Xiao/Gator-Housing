import { useState ,useEffect} from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import ApartmentList from './components/ApartmentList'
import ApartmentModal from './components/ApartmentModal'
import ReviewModal from './components/ReviewModal'
import apartmentService from './services/apartments'
import reviewService from './services/reviews'
import './App.css'

const App=()=>{
  const [apartments,setApartments]=useState([]);
  const [reviews,setReviews]=useState([]);
  const [searchName,setSearchName]=useState("");
  const [bedFilter,setBedFilter]=useState("All");
  const [maxPrice,setMaxPrice]=useState(2000);
  const [filteredApartments,setFilteredApartments]=useState([]);
  const [selectedApartment,setSelectedApartment]=useState(null);
  const [selectedReview,setSelectedReview]=useState(false);
  const [reviewAdded,setReviewAdded]=useState(false);
  const handleSubmitReview=(newReview)=>{
    reviewService.create(newReview)
      .then(response=>{
        setReviews(reviews.concat(response))
        setReviewAdded(true)
      })
      .catch(error=>{
        console.log("Error submitting a review",error)
      })

  }
  useEffect(()=>{
    apartmentService.getAll()
    .then(response=>{
      setApartments(response);
    })
    .catch(error=>{
      console.log("Error fetching apartments",error)
    })
    if (reviewAdded){
      setReviewAdded(false)
    }
  },[reviewAdded])
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
    <Navbar setSelected={setSelectedReview}/>
    <Searchbar name={searchName} setName={setSearchName} bed={bedFilter} setBed={setBedFilter} price={maxPrice} setPrice={setMaxPrice} />
    <h1>{searchName==="" ? apartments.length : filteredApartments.length} apartments found</h1>
    <ApartmentList apartments={filteredApartments} onSelect={(apartment)=>setSelectedApartment(apartment)}/>
    {selectedApartment!==null && <ApartmentModal apartment={selectedApartment} onClose={()=>setSelectedApartment(null)}/>}
    {selectedReview && <ReviewModal apartments={apartments} onClose={()=>setSelectedReview(false)} onSubmit={handleSubmitReview}/>}
    </>
  )
}
  

export default App
