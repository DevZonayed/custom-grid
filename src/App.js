import React from "react";
import { useDispatch } from "react-redux";
import { fatchLead } from "./redux/features/lead/leadSlice";
import DataGrid from "./components/DataGrid/DataGrid";
import DrawerProvider from "./components/Drawer/context/DrawerProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailTemplate from "./page/template/EmailTemplateBuilder";
// import DataOrg from "./components/another/DataOrg";
const App = () => {
  const dispatch = useDispatch();
  dispatch(fatchLead()); // Import fake user data to store
  return (
    <>
      <DrawerProvider>
        <DataGrid />
        {/* <EmailTemplate /> */}
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          limit={8}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </DrawerProvider>
    </>
  );
};

export default App;
