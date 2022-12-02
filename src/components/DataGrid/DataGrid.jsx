import React, { useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ProgressEditorRanderer,
  ProgressRanderer,
} from "./subComponents/ProgressRanderer";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import { fakeData } from "./fakeData/fakeData";
const DataGrid = () => {
  const socket = useRef();
  const tempId = uuid();
  const gridRef = useRef();

  let initialRowData = [];
  const ADD_ROW_DATA = "ADD_ROW_DATA";
  const EDIT_ROW_DATA = "EDIT_ROW_DATA";
  function rowDataReducer(state = initialRowData, { type, payload }) {
    switch (type) {
      case ADD_ROW_DATA:
        return payload;
      case EDIT_ROW_DATA:
        const { id, key, value, tempId: me } = payload;
        if (tempId !== me) {
          const softStateCopy = [...state];
          let index = softStateCopy.findIndex((item) => item.id === id);
          let leadObj = softStateCopy[index];
          leadObj[key] = value;
          softStateCopy[index] = leadObj;
          console.log(softStateCopy);
          return softStateCopy;
        } else {
          return state;
        }
      default:
        return state;
    }
  }

  // const [rowData, setrowData] = useReducer(rowDataReducer, initialRowData);
  // const [rowData, setrowData] = useState([]);
  const [rowData, setrowData] = useState([...fakeData]);
  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "name", pinned: "left", filter: true },
    { field: "phone", pinned: "left", filter: true },
    { field: "email", filter: true },
    {
      field: "interest",
      cellRenderer: ProgressRanderer,
      cellEditor: ProgressEditorRanderer,
      filter: true,
      editable: true,
    },
    { field: "regDate" },
    {
      field: "callStatus",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Done",
          "Pending",
          "No Answer",
          "Busy",
          "Call Back",
          "BlackList",
        ],
      },
    },
    { field: "progress", cellRenderer: ProgressRanderer, filter: true },
    {
      field: "leadType",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Web User", "Jillur Page", "General Page", "Comment"],
      },
      editable: true,
      width: "100",
    },
    { field: "comment", editable: true, width: 300 },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }));

  // Example of consuming Grid Event
  const cellEditHandler = useCallback((event) => {
    const editKey = event.colDef.field;
    const newValue = event.newValue;
    const id = event.data.id;

    // Brodcust Edited Data
    socket.current.emit("editedData", {
      id,
      key: editKey,
      value: newValue,
      tempId,
    });
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  // Script for realTime Data Transition
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on("initialData", (data) => {
      setrowData(data);
    });
    socket.current.emit("joinRoom", {
      roomName: "gridEditing",
      tempId,
    });

    socket.current.on("brodCastEditedData", (payload) => {
      setrowData((prev) => {
        const { id, key, value, tempId: me } = payload;
        if (tempId !== me) {
          const softStateCopy = [...prev];
          let index = softStateCopy.findIndex((item) => item.id === id);
          let leadObj = softStateCopy[index];
          leadObj[key] = value;
          softStateCopy[index] = leadObj;
          return [...softStateCopy];
        } else {
          return prev;
        }
      });
    });
  }, []);

  return (
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "97vh" }}
      >
        <AgGridReact
          pagination={true}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          onCellEditingStopped={cellEditHandler}
        />
      </div>

      {/* <GroupGridExample /> */}
    </div>
  );
};

export default DataGrid;
