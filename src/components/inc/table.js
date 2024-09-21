import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { IconButton, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuickSearchToolbar(props) {
  const { value, onChange } = props;

  return (
    <div>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        InputProps={{
          startAdornment: <SearchIcon />,
          endAdornment: value && (
            <IconButton onClick={() => onChange("")}>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

const Table = (props) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (params) => {
    console.log(params);
    const userId = params.row.id;
    navigate(`/user/${userId}`);
  };


  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  return (
    <div>
      <div className="m-4">
        <DataGrid
          className="data-grid p-2"
          // onRowClick={handleRowClick}
          sx={{
            width: "100%",
            height: 500,
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[200],
            },
          }}
          rows={props.rows}
          columns={props.columns}
          components={{
            Toolbar: QuickSearchToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 2,
            bottom: params.isLastVisible ? 0 : 2,
          })}
          localeText={{
            toolbarDensity: "Size",
            toolbarDensityLabel: "Size",
            toolbarDensityCompact: "Small",
            toolbarDensityStandard: "Medium",
            toolbarDensityComfortable: "Large",
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          checkboxSelection
          hideFooter
          onSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectedRows}
        />
      </div>
    </div>
  );
};

export default Table;