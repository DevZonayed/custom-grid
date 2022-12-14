import {
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useSelector } from "react-redux";
import { DrawerContext } from "../../Drawer/context/DrawerProvider";
import useDrawer from "../../Drawer/hook/useDrawer";
import EditLeadDrawer from "../subComponents/DrawerComponents/EditLeadDrawer";
import { adminDataCulmn } from "../utils/admin/adminColumn";
import useContextMenu from "../hooks/useContextMenu";
import leadToRowData from "../utils/functions/leadToRowDataCovart";
export const useDataGrid = () => {
  const gridRef = useRef();
  const { contextMenu } = useContextMenu();
  const allStoreData = useSelector((state) => state);
  const { myData: userData, lead } = allStoreData;
  const [search, setSearch] = useState("");
  const searchKey = useDeferredValue(search);
  const [isPending, startTransition] = useTransition();
  const drawer = useDrawer();
  const { setExtraData } = useContext(DrawerContext);
  const defaultColumnData = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );
  const [leadRow, setLeadRow] = useState([]);
  const rowData = useMemo(() => {
    if (searchKey !== "") {
      // Here we can get data throw api
      return leadRow || [];
    } else {
      return leadRow || [];
    }
  }, [searchKey, leadRow]);

  useEffect(() => {
    startTransition(() => {
      let rowData = leadToRowData(lead);
      setLeadRow(rowData);
    });
  }, [lead]);

  useEffect(() => {
    if (gridRef.current.api !== undefined) {
      if (isPending) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [isPending]);

  const columnData = useMemo(() => {
    // set column based on user role
    if (userData.role === "admin") {
      return adminDataCulmn;
    } else {
      // return adminDataCulmn;
    }
  }, [userData]);

  // Apperiencing Grid Rows
  const handleRowStyle = useMemo(() => {
    return {
      admitted_lead: (params) => {
        return params.data.isAdmitted;
      },
    };
  }, []);

  const handleCellDubbleClick = (event) => {
    // Admition Validation
    if (event.data.isAdmitted) {
      return false;
    }
    setExtraData(event.data.id);
    drawer.show(<EditLeadDrawer />);
  };

  return {
    gridRef,
    setSearch,
    rowData,
    columnData,
    defaultColumnData,
    contextMenu,
    handleCellDubbleClick,
    handleRowStyle,
  };
};
