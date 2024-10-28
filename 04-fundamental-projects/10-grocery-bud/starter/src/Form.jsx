import { cloneElement, useState } from "react";

//TODO -invoke addItem function when we submit the form
const Form = ({ addItem }) => {
  //the state value that saves whatever we are typing
  const [newItemName, setNewItemName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(newItemName);
    //first check if there is no new item name
    if (!newItemName) {
      return;
    }
    //if there is a value
    addItem(newItemName);
    //clear the form input to  empty 
    setNewItemName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>grocery bud</h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          value={newItemName}
          onChange={(e) => {
            setNewItemName(e.target.value);
          }}
        />
        <button type="submit" className="btn">
          add item
        </button>
      </div>
    </form>
  );
};

export default Form;
