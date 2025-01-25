//TODO - this is the pagination container specific to the Orders page with  ....
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  //we are looking for  the page count and the page from the meta

  const { pageCount, page } = meta.pagination; //page is the current page number

  //   //pages is an array of sequential numbers ranging from 1 to pageCount that we embed in the actual container
  //   const pages = Array.from({ length: pageCount }, (_, index) => {
  //     return index + 1; //to  start from 1 and not 0
  //   });

  const { search, pathname } = useLocation(); //useLocation gives  you the current search params and the path as well
  const navigate = useNavigate();

  //todo - below function updates the URL query string without refreshing the page.
  const handlePageChange = (pageNumber) => {
    /*
  parses the query string into a key-value map-like object, making it easier to add, update, or delete parameters.
  */
    const searchParams = new URLSearchParams(search); //search  comes from useLocation and contains the query  string along with ?
    console.log(searchParams);
    //Creates a mutable object (searchParams) to update the page query parameter without manually modifying the string.
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`); //naviagte back to Products page but with the new query  params
    // console.log(pageNumber);
    console.log(search); //empty if you dont have any query params else will get the entire query params string
    console.log(pathname);
  };

  //TODO- THE BELOW FUNCTION CREATES AN button ELEMENT
  //function that looking for 2 things  and returns a button
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  //we will  set up only the first and last button in the beginning
  const renderPageButtons = () => {
    const pageButtons = [];
    //first button - if the button  is indeed the first one then it will have the active class
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    //dots
    if (page > 2) {
      pageButtons.push(
        <button className="join-item btn  btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    //for the actual active page /current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    //dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn  btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }
    //last button - if page is actually the last page then highlight it
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null; // dont display the pagination container

  return (
    <div className="mt-16 flex  justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1; //where page is the current page
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {/* the actual page numbers  */}
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ComplexPaginationContainer;
