//this is where we will  set up the nested pages
import { Link, Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  //useNavigation hook to give us info about the naviagtion state
  const navigation = useNavigation(); //when we click on home there is first a loading state and then idle  state , navigation is an object with a property  called state
  const isPageLoading = navigation.state === "loading";

  // const value = "some value "; //pass it as context prop  inside Outlet 

  return (
    <>
      {/* navbar and footer  will be shared across all the pages  */}

      <Navbar />
      <section className="page">
        {isPageLoading ? (
          <div className="loading" />
        ) : (
          <Outlet  />
        )}
      </section>
    </>
  );
};
export default HomeLayout;
