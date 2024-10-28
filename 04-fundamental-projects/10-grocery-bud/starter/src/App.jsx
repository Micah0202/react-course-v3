import { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";
const App = () => {
  //List will  be the state value
  const [items, setItems] = useState([]); //initiall y empty array as there are no items initially

  //function addItem that will add items to  the list  ie items state variable
  //name is the only thing we have to  grab from the Form component as id is auto generated and the isCompleted is set to false by default
  const addItem = (itemName) => {
    //construct  a new object  with  id , nanme and isCompleted
    const newItem = {
      name: itemName, //the  only thing  we get from the user
      completed: false, //default
      id: nanoid(),
    };
    //add the item to list
    setItems([...items, newItem]); //since we are only adding to the existing list first spread out the existing items
  };

  const removeItem = (itemId) => {};

  return (
    <section className="section-center">
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} />
    </section>
  );
};

export default App;
