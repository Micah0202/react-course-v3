import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered, FaThemeisle } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";
const Navbar = () => {
  const dispatch = useDispatch();

  const handleTheme = () => {
    //fetch  the theme  from local storage
    //const { winter, dracula } = themes;
    // if (theme === winter) {
    //     newTheme = dracula;
    //   } else {
    //     newTheme = winter;
    //   }
    // const newTheme = theme === winter ? dracula : winter; //if theme is winter then set it to dracula
    //to directly access the html
    // setTheme(newTheme); //jus set to opposite value

    dispatch(toggleTheme());
  };

  //every time the theme state variable changes we save the value in the local storage and set the
  //useEffect runs every time theme changes
  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  //useSelector  gets the entire redux store as an  argument so you can access the cartState or any other piece odf that from the store
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/*TITLE ie the comfy logo  that on redirecting goes back to the home page , large screen  pe we will see the C icon*/}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </NavLink>
          {/*DROPDOWN large screen pe hidden */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            {/* inside the ul  we have the list items coming from NavLinks component */}
            <ul
              tabIndex={0}
              className="menu menu-small dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        {/* inside navbar-end we have the theme  logo and cart icon */}
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/*sun icon */}
            <BsSunFill className="swap-on h-4 w-4" />
            {/*moon icon*/}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {/* CART LINK */}
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
