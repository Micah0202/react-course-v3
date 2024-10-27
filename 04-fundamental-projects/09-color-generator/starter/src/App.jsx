import Form from "./Form";
import ColorList from "./ColorList";
import Values from "values.js";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [colors, setColors] = useState(new Values("#f15025").all(10)); //THIS IS THE DEFAULT SET OF COLORS YOU SEE WHEN  THE INPUT IS BLANK

  //looks for color
  const addColor = (color) => {
    try {
      //if everything is fine we  set up  a new list
      const newColors = new Values(color).all(10);
      setColors(newColors); //triggers a re render of color list wiht the new color variations 
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main>
      <Form addColor={addColor} />
      <ColorList colors={colors} />
      <ToastContainer position="top-center" />
    </main>
  );
};
export default App;
