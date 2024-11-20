//this is where we will  set up the nested pages 
import { Link, Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'

const HomeLayout = () => {
  return (
    <>
       {/* navbar nd footer  will be shared across all the pages  */}
        
        <Navbar/>
        <section className="page">
         <Outlet/>
        </section>
       
        <footer>Footer</footer>

    </>
  )
}
export default HomeLayout