//the component for toggling between light mode and dark mode 

import {useGlobalContext} from "./context" ;
import {BsFillSunFill ,BsFillMoonFill } from "react-icons/bs" 
const ThemeToggle = () => {
  const {isDarkTheme, toggleDarkTheme} =useGlobalContext() ; //get the state variable and the toggle function from the global context 
  return (
   <section className="toggle-container">
    <button className="dark-toggle" onClick={toggleDarkTheme}>
      {isDarkTheme ?(<BsFillMoonFill className="toggle-icon"/>):(   <BsFillSunFill className="toggle-icon"/>) }
      
   
    </button>
   </section>
  )
}
export default ThemeToggle