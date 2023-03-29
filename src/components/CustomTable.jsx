/**
 * A custom table component that displays data in rows and columns format.
 * @component
 * @param {Object} props - The props object containing data to be displayed in the table.
 * @param {Array} props.columns - The columns to display in the table.
 * @param {Array} props.rows - The rows to display in the table.
 * @param {Function} props.deleteFeedback - The function to call when the "Resolve" button is clicked.
 **/
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function CustomTable(props) {
  return (
    <TableContainer sx={{  mt: 5 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell
                sx={{ backgroundColor: "black", color: "white" }}
                align="center"
              >
                {column}
              </TableCell>
            ))}

            {/* <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.message}</TableCell>

              <TableCell align="center">
                <Button sx={{border:"1px solid red"}}color="warning" value={row.id} onClick={props.deleteFeedback}>
                  Resolve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
