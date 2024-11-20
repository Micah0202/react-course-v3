//where we will  fetch all of the cocktails

import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a"; //whatever value is after the question mark is the search term , cannot leave a blank space after the  =  as then we will  get  an error of no data found and data will  be a string and not an array

//TODO - USING REACT QUERY

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

//here we will define the  loader function WHICH IS NOT A HOOK
export const loader = async ({ request }) => {
  const url = new URL(request.url); //the new URL() constructor creates a URL object , allowing u to  easily parse and interact with different parts of the url

  const searchTerm = url.searchParams.get("search") || ""; //allows you to get value of the search parameter  //any value after the equal  to  is the search term

  //  console.log(response);//response is an object with a data property that has an array of drinks
  //  return 'something';
  return { searchTerm }; //searchTerm is used in react query and response.data.drinks is an array , searchTerm will make sense for react  query
};

const Landing = () => {
  const { searchTerm } = useLoaderData(); //data has whatever the loader returns ie the array of objects where  each object is a drink
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  // console.log(drinks);
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
