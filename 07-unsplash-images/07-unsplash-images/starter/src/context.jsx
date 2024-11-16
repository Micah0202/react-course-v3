import {createContext , useContext , useState ,useEffect} from "react" ; 
//react  query can be used  for fetching data from server and context api can be used for local application state 
//define the theme state value here  

const AppContext = createContext() ; 

const getInitialDarkMode  =()=>{
   const prefersDarkmode = window.matchMedia('(prefers-color-scheme:dark)').matches
   
   return prefersDarkMode ;
}
export const AppProvider =({children})=>{
    const [isDarkTheme,setIsDarkTheme] =useState(getInitialDarkMode);  //state variable that will  hold the state of the page dark mode or light mode 
    
    //searchTerm will be used in the gallery and setSearchTrm is used in the form
    const [searchTerm,setSearchTerm] = useState('cat') ;
    
    //function that will  set the state variable  and toggle the view port theme
 const toggleDarkTheme =()=>{
  const newDarkTheme = !isDarkTheme;
    //just set the isDarkTheme variable to  opposite of what it is 
    setIsDarkTheme(newDarkTheme);//based on the state value 
    const body = document.querySelector('body');
    body.classList.toggle('dark-theme' , newDarkTheme);//if newDarkTheme is true it adds the class of dark-theme
    console.log('dark-theme') ;

 }
 
 useEffect(()=>{
   document.body.classList.toggle('dark-theme' , isDarkTheme)

 },[isDarkTheme])

  return <AppContext.Provider value={{isDarkTheme ,toggleDarkTheme ,searchTerm , setSearchTerm }}>{children}</AppContext.Provider>
}

//custom hook that will  be used in every component 
export const useGlobalContext = () =>{
   return  useContext(AppContext);
}