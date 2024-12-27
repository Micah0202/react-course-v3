//this is the Checkout page where we have the shipping details and the CartTotals component that we can re use
import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";
import { toast } from "react-toastify";

//check for user
//will have to use the same setup  of a loader being a function that returns a function as we need to  access the store here
export const loader = (store) => () => {
  //get the current user in the loader using
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("you must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
