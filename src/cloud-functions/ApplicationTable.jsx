import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function ApplicationTable({ applications }) {

  const [rows, setRows] = useState([])
  
  useEffect(() => {
    setRows(applications)
  })

  const columns = [
    { field: 'company', headerName: 'Company', width: 130 },
    { field: 'stage', headerName: 'Stage', width: 130 },
    { field: 'jobTitle', headerName: 'Job Title', width: 130 },
    { field: 'linkedinNote', headerName: 'LinkIn Note', width: 130 },
    { field: 'connectionSent', headerName: 'Connection Sent', width: 130 },
    { field: 'applyeDate', headerName: 'Apply Date', width: 130 },
    { field: 'responseDate', headerName: 'Response Date', width: 130 },
    { field: 'link', headerName: 'Link', width: 130 },
    { field: 'referral', headerName: 'Referral', width: 130 },
    { field: 'salary', headerName: 'Salary', width: 130 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
      />
    </div>
  );
}
