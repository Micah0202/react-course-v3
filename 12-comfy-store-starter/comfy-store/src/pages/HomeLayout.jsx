//this home layout will have the stuff that is shared across all the components like the navbar and the headers and the outlet
import {Outlet ,useNavigation} from "react-router-dom"
//get the header here as it will be in all the components
import {Header,Navbar,Loading} from '../components'
const HomeLayout = () => {
  //Loading logic
  const navigation   = useNavigation() ; 
  const isPageLoading  = navigation.state=== 'loading' ; //variable will be true if page is loading '

  return (
    <>
     <Header/>
     <Navbar/>
     {/* if page is loading then display the loading spinner else display the outlet */}
     {isPageLoading ? <Loading/>  : 
     
      //adding the class that we defined in index.css to align all the pages  so all the children of HomeLayout except Login and register will  have these  styles 
      <section className="align-element py-20">
      <Outlet/> 
    </section>}
    
    
    </>
  )
}
export default HomeLayout