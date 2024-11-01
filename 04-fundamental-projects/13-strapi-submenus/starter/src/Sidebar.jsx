import { FaTimes } from "react-icons/fa";
import sublinks from "./data";
import { useGlobalContext } from "./Context";

const Sidebar = () => {
  //grab the state value and for the close button grab the closeSidebar function
  const { closeSidebar, isSidebarOpen } = useGlobalContext();
  return (
    <aside className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
      <div className="sidebar-container">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        {/*below is the first loop  */}
        <div className="sidebar-links">
          {/*below here we iterate over the sublinks array */}
          {sublinks.map((item) => {
            const { page, pageId, links } = item;
            return (
              <article key={pageId}>
                <h4>{page}</h4>
                <div className="sidebar-sublinks">
                  {/*here we iterate over the links array */}
                  {links.map((link) => {
                    const { url, icon, label, id } = link;
                    return (
                      <a key={id} href={url}>
                        {icon}
                        {label}
                      </a>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
