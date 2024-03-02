import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useCallback, useRef } from "react";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-theme-alpine.css";

const dateFormatter = (params: any) => {
  const dateString = params.value;

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

const checklistFormatter = (params: any) => {
  if (params.value === "Y") {
    return "Yes";
  }
  if (params.value === "N") {
    return "No";
  } else {
    return " ";
  }
};

const columnDefs: ColDef[] = [
  {
    field: "designation",
    headerName: "Designation",
    sortable: true,
    filter: true,
  },
  {
    field: "discovery_date",
    headerName: "Discovery Date",
    sortable: true,
    filter: true,
    valueFormatter: dateFormatter,
  },
  { field: "h_mag", headerName: "H (mag)", sortable: true, filter: true },
  { field: "moid_au", headerName: "MOID (au)", sortable: true, filter: true },
  { field: "q_au_1", headerName: "q (au)", sortable: true, filter: true },
  { field: "q_au_2", headerName: "Q (au)", sortable: true, filter: true },
  {
    field: "period_yr",
    headerName: "Period (yr)",
    sortable: true,
    filter: true,
  },
  {
    field: "i_deg",
    headerName: "Inclination (deg)",
    sortable: true,
    filter: true,
  },
  {
    field: "pha",
    headerName: "Potentially Hazardous",
    sortable: true,
    filter: true,
    valueFormatter: checklistFormatter,
  },
  {
    field: "orbit_class",
    headerName: "Orbit Class",
    enableRowGroup: true,
    sortable: true,
    filter: true,
  },
];
const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<AgGridReact>(null);

  const clearFilters = useCallback(() => {
    gridRef.current!.api.setFilterModel(null);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Near-Earth Object Overview</h1>
        <button onClick={clearFilters} style={{ marginLeft: 15, height: 30 }}>
          Clear Filters
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={"always"}
        enableRangeSelection={true}
        enableRangeHandle={true}
      />
    </div>
  );
};

export default NeoGrid;
