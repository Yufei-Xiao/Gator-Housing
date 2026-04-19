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
  const [reviews,setReviews]=useState([]);//all reviews
  const [searchName,setSearchName]=useState("");
  const [bedFilter,setBedFilter]=useState("All");
  const [maxPrice,setMaxPrice]=useState(2000);
  const [filteredApartments,setFilteredApartments]=useState([]);
  const [selectedApartment,setSelectedApartment]=useState(null);// selected apartment object
  const [selectedReview,setSelectedReview]=useState(false); //submit review button pressed or not
  const [selectedReviews,setSelectedReviews]=useState([]);//reviews for the selected apartment
  const handleSubmitReview=async(newReview,newApartment)=>{
    try {
      let createdApartment = null;
      let reviewToSend=newReview;
      if (Object.keys(newApartment).length !== 0) {
        createdApartment = await apartmentService.create(newApartment);
        setApartments(apartments.concat(createdApartment));
        
        reviewToSend.apartment_id=createdApartment.id;
      }
      await reviewService.create(reviewToSend)
        .then(response => {
          setReviews(reviews.concat(response));
        });
      const updatedApartments = await apartmentService.getAll();
      setApartments(updatedApartments);
    } catch (error) {
      console.log("Error submitting a review", error);
    }
    
  }
  //fetching apartments
  useEffect(()=>{
    apartmentService.getAll()
    .then(response=>{
      setApartments(response);
    })
    
    .catch(error=>{
      console.log("Error fetching apartments",error)
    })
    
  },[])
  //fetching reviews
  useEffect(()=>{
    reviewService.getAll()
    .then(response=>{
      setReviews(response)
    })
    .catch(error=>{
      console.log("Error fetching reviews",error)
    })
  },[])
  
  //for filtering
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
  //for rendering the reviews for a selected apartment card
  useEffect(()=>{
      if(selectedApartment){
        reviewService.getByApartment(selectedApartment.id)
        .then(response=>setSelectedReviews(response))
        .catch(error=>{
          console.log("Error finding an apartment",error)
        })
      
      }else{
        setSelectedReviews([])
      }
  },[selectedApartment])
  return (
    <>
    <Navbar setSelected={setSelectedReview}/>
    <Searchbar name={searchName} setName={setSearchName} bed={bedFilter} setBed={setBedFilter} price={maxPrice} setPrice={setMaxPrice} />
    <h1>{searchName==="" ? apartments.length : filteredApartments.length} apartments found</h1>
    <ApartmentList apartments={filteredApartments} onSelect={(apartment)=>setSelectedApartment(apartment)}/>
    {selectedApartment!==null && <ApartmentModal apartment={selectedApartment} reviews={selectedReviews} onClose={()=>setSelectedApartment(null)}/>}
    {selectedReview && <ReviewModal apartments={apartments} onClose={()=>setSelectedReview(false)} onSubmit={handleSubmitReview}/>}
    </>
  )
}
  

export default App
