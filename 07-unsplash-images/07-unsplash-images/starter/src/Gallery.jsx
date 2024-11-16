
import axios from 'axios'; 
import {useQuery} from '@tanstack/react-query';
const url  ='https://api.unsplash.com/search/photos?client_id=7pmB29Xi9rOWHhYpvtuc4edchzh1w0eawUjJwNAqngA' ;


const Gallery = () => {
 
  const {searchTerm} = useGlobalContext(); //to  get the state variable from the context 
  //response returned by useQuery hook 
 const response= useQuery({
  queryKey :['images', searchTerm],
  //fn returns a promise 
  queryFn : async() =>{
    const  result =await axios.get(`${url}&query=${searchTerm}`) ; //use th state variable to make the 
    
    return result.data;
  }
 });

  if(response.isLoading){
    return (
      <section className="image-container">
         <h4>Loading...</h4>
      </section>
    )
  }
  if(response.isError){
    return (
      <section className="image-container">
         <h4>There was an error...</h4>
      </section>
    )
  }

  const results = response.data.results ;
  if(results.length < 1 ){
    return (
      <section className="image-container">
         <h4>No results found</h4>
      </section>
    )
  }
 return <section>
  
  {results.map((item)=>{
    const url = item?.urls?.regular ;//url that is the src 
     return <img src={url} key={item.id} alt={item.alt_description} className="img"/>
  })}
 </section>
 
}
export default Gallery