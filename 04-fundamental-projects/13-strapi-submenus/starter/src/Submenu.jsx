import { useGlobalContext } from "./Context";
import sublinks from "./data";
import { useRef } from "react";

//only for big screen layout
const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext(); //get the state variable from the global  context
  const currentPage = sublinks.find((item) => item.pageId === pageId); //initially undefined but when we hover we  get the pageId dont show the submenu  if the currentPage is undefined

  const submenuContainer = useRef(null);

  const handleMouseLeave = (event) => {
    const submenu = submenuContainer.current;
    const { left, right, bottom } = submenu.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  };

  //use optional chaining as the initial  value in the global context for the state variable is null
  return (
    <div
      className={currentPage ? "submenu show-submenu" : "submenu"}
      onMouseLeave={handleMouseLeave}
      ref={submenuContainer}
    >
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
