import { useGlobalContext } from "./Context";
import sublinks from "./data";
const NavLinks = () => {
  //pageId will be used in the submenu component , whereas here in the NavLinks.jsx we just use the settr  function setPageId
  const { setPageId } = useGlobalContext();
  return (
    <div className="nav-links">
      {sublinks.map((item) => {
        const { page, pageId } = item;
        return (
          <button
            key={pageId}
            className="nav-link"
            onMouseEnter={() => {
              setPageId(pageId); //as we hover over the navlink button  we get the specific page id
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default NavLinks;
