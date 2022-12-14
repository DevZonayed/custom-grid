import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDataGrid } from "./hooks/useDataGrid";
import "./style/conditionalStyle.css";
import { toast } from "react-toastify";
const DataGrid = () => {
  // Each Column Definition results in one Column.
  // Example of consuming Grid Event

  const {
    rowData,
    columnData,
    defaultColumnData,
    contextMenu,
    handleCellDubbleClick,
    handleRowStyle,
    gridRef,
  } = useDataGrid();

  /**
   * This Handler will work for Selected toas
   * @param {*} params
   */
  const handleSelectionChange = (params) => {
    if (params.api.getSelectedRows().length >= 10) {
      toast.dismiss();
      toast.success(`${params.api.getSelectedRows().length} Lead Selected!`);
    }
  };

  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "97vh" }}
      >
        <AgGridReact
          onCellDoubleClicked={handleCellDubbleClick}
          pagination={true}
          suppressCopyRowsToClipboard={true}
          onSelectionChanged={handleSelectionChange}
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnData}
          defaultColDef={defaultColumnData}
          animateRows={true}
          rowSelection="multiple"
          allowContextMenuWithControlKey={true}
          rowClassRules={handleRowStyle}
          getContextMenuItems={contextMenu}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">Processing All Data...</span>'
          }
        />
      </div>

      {/* <GroupGridExample /> */}
    </div>
  );
};

export default DataGrid;
