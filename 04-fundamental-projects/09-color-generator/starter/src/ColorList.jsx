import SingleColor from "./SingleColor";
import { nanoid } from "nanoid";

const ColorList = ({ colors }) => {
  //iterate over and for every item we want to return the single color
  return (
    <section className="colors">
      {colors.map((color, index) => {
        return <SingleColor color={color} index={index} key={nanoid()} />;
      })}
    </section>
  );
};

export default ColorList;
