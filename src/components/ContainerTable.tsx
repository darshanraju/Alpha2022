import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AlphaService, { RegistryData, RegistryDataTypes } from "../Alpha";
import { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import styled from "styled-components";

interface Column {
  id: RegistryDataTypes;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: RegistryDataTypes.Image,
    label: RegistryDataTypes.Image,
    minWidth: 170,
  },
  {
    id: RegistryDataTypes.Interface,
    label: RegistryDataTypes.Interface,
    minWidth: 100,
  },
  {
    id: RegistryDataTypes.Location,
    label: RegistryDataTypes.Location,
    minWidth: 100,
  },
  {
    id: RegistryDataTypes.Subscribe,
    label: RegistryDataTypes.Subscribe,
    minWidth: 100,
  },
];

const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

interface IContainerTable {
  email: string;
  openToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContainerTable = ({ email, openToast }: IContainerTable) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Array<RegistryData>>([]);

  useEffect(() => {
    const getRows = async () => {
      const registryData = await AlphaService.getContainerRegistry();
      console.log("Registry Data");
      console.log(registryData);
      setRows(registryData);
    };
    getRows();
  }, []);

  const subscribeToImage = async (email: string, image: string) => {
    await AlphaService.subscribeToImageChange(email, image);
    openToast(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderSubscription = (column: any, value: any) => {
    return (
      <TableCell key={column.id} align={column.align}>
        <IconWrapper onClick={() => subscribeToImage(email, value)}>
          <EmailIcon fontSize="medium" />
        </IconWrapper>
      </TableCell>
    );
  };

  return (
    <div style={{ width: "90vw" }} className="parentCOntainerTable">
      <Paper
        style={{ width: "100%" }}
        sx={{ width: "100%", overflow: "hidden", height: "100%" }}
        className="ContainerTablePaper"
      >
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.Image}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === RegistryDataTypes.Subscribe) {
                          return renderSubscription(column, value);
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ContainerTable;
