import { Fa500Px, FaBars } from "react-icons/fa";

import { useGlobalContext } from "./Context";
import NavLinks from "./NavLinks";
const Navbar = () => {
  //get the function  that will open up  the sidebar (for small screen)
  const { openSidebar } = useGlobalContext();
  return (
    <nav>
      <div className="nav-center">
        <h3 className="logo">strapi</h3>
        <button className="toggle-btn" onClick={openSidebar}>
          <FaBars />
        </button>
        {/*nav links later */}
        <NavLinks/>
      </div>
    </nav>
  );
};

export default Navbar;
