import { useGlobalContext } from "./Context";
import sublinks from "./data";

//only for big screen layout
const Submenu = () => {
  const { pageId } = useGlobalContext(); //get the state variable from the global  context
  const currentPage = sublinks.find((item) => item.pageId === pageId); //initially undefined but when we hover we  get the pageId dont show the submenu  if the currentPage is undefined

  //use optional chaining as the initial  value in the global context for the state variable is null
  return (
    <div className="submenu">
      <h5>{currentPage?.page}</h5>
      {/*render the sublinks  */}
      <div
        className="submenu-links"
        style={{
          gridTemplateColumns:
            currentPage?.links?.length > 3 ? " 1fr 1fr" : "1fr",
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;
          return (
            <a key={id} href={url}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Submenu;
