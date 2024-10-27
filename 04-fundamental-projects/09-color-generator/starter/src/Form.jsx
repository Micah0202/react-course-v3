import { useState } from "react";
const Form = ({ addColor }) => {
  //just use useState
  const [color, setColor] = useState("");//color  holds  the color from the input field 
  //handleSubmit adds the color to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    addColor(color);
  };
  return (
    <section className="container">
      <h4>color generator</h4>
      <form className="color-form" onSubmit={handleSubmit}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text" // Specifies that the input is text
          value={color} // Binds the color state to this input field
          onChange={(e) => setColor(e.target.value)} // Updates color state on input change
          placeholder="#f15025"
        />
        <button className="btn" type="submit" style={{ background: color }}>
          submit
        </button>
      </form>
    </section>
  );
};

export default Form;
