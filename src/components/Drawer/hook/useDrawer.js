import { useContext } from "react";
import { DrawerContext } from "../context/DrawerProvider";

/**
 *
 * @returns {show hide} // Method to show or hide the Drawer
 */
const useDrawer = () => {
  const { setDrawerOpen, component } = useContext(DrawerContext);
  const show = (children) => {
    setDrawerOpen(true);
    component(children);
  };
  const hide = () => {
    setDrawerOpen(false);
  };
  return { show, hide };
};

export default useDrawer;

// const firstRender = useRef(true);
// useEffect(() => {
//   if (drawerOpen === false) {
//     if (firstRender.current) {
//       firstRender.current = false;
//       return;
//     }
//     alert();
//   }
// }, [drawerOpen]);
