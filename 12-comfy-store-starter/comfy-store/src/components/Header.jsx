import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";
const Header = () => {
  const navigate = useNavigate();
  //use dispatch  because when we click on logout I  want to dispatch 2 actions ie logoutUser from usersliceand  the clearCart from cartSlice
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    //when i click on th logout button i want 3 things to happen - navigate to / , then dispatch clearCart() and then dispatch logoutUser()
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  };
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {/* when we get to  640 px we align everything to  the rhs */}
        {/* if no user then  shw login /register buttons thats why  we have the if else  */}
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello , {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
        {/*USER  */}

        {/* if the user does not  exis then only show the below  links  */}
        {/*LINKS */}
      </div>
    </header>
  );
};
export default Header;
