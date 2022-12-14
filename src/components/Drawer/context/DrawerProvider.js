import { createContext, useMemo, useRef } from "react";

import React from "react";
import { useState } from "react";
import "./style/drawer.css";

export const DrawerContext = createContext();
const DrawerProvider = ({ children }) => {
  const drawerRef = useRef();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [extraData, setExtraData] = useState();
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const [width, setWidth] = useState("35%");
  const [comp, component] = useState();
  //  const [containerHeight, setContainerHeight] = useState(0);
  // useEffect(() => {
  //   let vewpoerHeight = window.innerHeight;
  //   let containerHeight = drawerRef.current.offsetHeight;
  //   let calCulateHeight = (containerHeight / vewpoerHeight) * 100;
  //   window.addEventListener("resize", () => {
  //     vewpoerHeight = window.innerHeight;
  //     containerHeight = drawerRef.current.offsetHeight;
  //     calCulateHeight = (containerHeight / vewpoerHeight) * 100;
  //   });
  //   setContainerHeight(
  //     Math.ceil(calCulateHeight) < 100 ? 100 : Math.ceil(calCulateHeight)
  //   );

  //   return () => {
  //     window.removeEventListener("resize");
  //   };
  // }, [drawerOpen, extraData]);

  const componentMemo = useMemo(() => {
    return comp;
  }, [comp]);
  return (
    <DrawerContext.Provider
      value={{
        setWidth,
        drawerOpen,
        setDrawerOpen,
        component,
        extraData,
        setExtraData,
      }}
    >
      {children}
      <div
        ref={drawerRef}
        style={{
          "--drawerWidth": width,
          // height: `${containerHeight}vh`,
        }}
        className={drawerOpen ? "drawer_container open" : "drawer_container"}
      >
        {componentMemo}
      </div>
      <div
        onClick={closeDrawer}
        title={"Click to close!"}
        className={drawerOpen ? "drawer_overlay open" : "drawer_overlay"}
      ></div>
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
