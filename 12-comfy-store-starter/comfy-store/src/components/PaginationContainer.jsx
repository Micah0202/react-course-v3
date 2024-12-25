import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const {meta} =useLoaderData() ;
  //we are looking for  the page count and the page from the meta 

  const {pageCount ,page } = meta.pagination ; //page is the current page number 
  

  //pages is an array of sequential numbers ranging from 1 to pageCount that we embed in the actual container 
  const pages =Array.from({length: pageCount} ,(_,index)=>{
     return index + 1 ;
  }) ;

  const {search  , pathname} = useLocation() ; //useLocation gives  you the current 
  const  navigate = useNavigate();
  
  //below function updates the URL query string without refreshing the page.
 const handlePageChange  = (pageNumber) =>{

  /*
  parses the query string into a key-value map-like object, making it easier to add, update, or delete parameters.
  */
  const searchParams = new URLSearchParams(search); //search  comes from useLocation and contains the query  string 
  console.log(searchParams);
  //Creates a mutable object (searchParams) to update the page query parameter without manually modifying the string.
  searchParams.set('page',pageNumber) ;
  navigate(`${pathname}?${searchParams.toString()}`)
  // console.log(pageNumber);
  console.log(search);//empty if you dont have any query params else will get the entire query params string 
  console.log(pathname);

}

 if(pageCount < 2) return null ; // dont display the pagination container 

  

  return (
    <div className="mt-16 flex  justify-end">
      <div className="join">
        <button className="btn btn-xs sm:btn-md join-item" onClick={()=>{
          let prevPage= page-1  ;
          if(prevPage < 1)prevPage =pageCount ;
          handlePageChange(prevPage);
        }}>
           Prev
        </button>
        {pages.map((pageNumber)=>{
           return  <button key={pageNumber} onClick={()=>handlePageChange(pageNumber)} className={`btn btn-xs sm:btn-md border-none join-item ${pageNumber === page ? 'bg-base-300 border-base-300':''}`}>{pageNumber}</button>
        })}
        <button className="btn btn-xs sm:btn-md join-item" onClick={()=>{
          let nextPage= page+1  ;
          if(nextPage >pageCount )nextPage =1 ;
          handlePageChange(nextPage);
        }}>
           Next
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer ;