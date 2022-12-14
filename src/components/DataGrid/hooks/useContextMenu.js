import { useSelector } from "react-redux";
import useDrawer from "../../Drawer/hook/useDrawer";
import SendMessageDrawer from "../subComponents/DrawerComponents/SendMessageDrawer";
import SendMailDrawer from "../subComponents/DrawerComponents/SendMailDrawer";
import mailImage from "../../../assets/ContextMenuIcons/mail.svg";
import agentImage from "../../../assets/ContextMenuIcons/agent.svg";
import tagsImage from "../../../assets/ContextMenuIcons/tags.svg";
const useContextMenu = () => {
  const userInfo = useSelector((state) => state.myData);
  const drawer = useDrawer();

  const contextMenu = (params) => {
    var result = [
      {
        name: "Send Message",
        icon: `<img width="20px" src=${mailImage}/>`,
        disable: userInfo.role !== "admin",
        tooltip:
          userInfo.role !== "admin"
            ? "Don't have permission."
            : "Click Me to Send Message",
        action: () => {
          drawer.show(
            <SendMessageDrawer data={params.api.getSelectedRows()} />
          );
        },
      },
      {
        name: "Send Mail",
        icon: `<img width="20px" src=${mailImage}/>`,
        disable: userInfo.role !== "admin",
        tooltip:
          userInfo.role !== "admin"
            ? "Don't have permission."
            : "Click Me to Send Email",
        action: () => {
          drawer.show(<SendMailDrawer data={params.api.getSelectedRows()} />);
        },
      },
      {
        name: "Assign Agent",
        icon: `<img width="20px" src=${agentImage}/>`,
        disable: userInfo.role !== "admin",
        tooltip:
          userInfo.role !== "admin"
            ? "Don't have permission."
            : "Click Me to Assign Agent",
        action: () => {
          drawer.show(
            <>
              <h3>Assign Agent</h3>
            </>
          );
        },
      },
      {
        name: "Add Tags",
        icon: `<img width="20px" src=${tagsImage}/>`,
        disable: userInfo.role !== "admin",
        tooltip:
          userInfo.role !== "admin"
            ? "Don't have permission."
            : "Click Me to Add Tags",
        action: () => {
          drawer.show(
            <>
              <h3>Adding Tags</h3>
            </>
          );
        },
      },

      "separator",
      "copy",
    ];
    return result;
  };

  return { contextMenu };
};

export default useContextMenu;
