import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, InputLabel } from "@mui/material";

/**
 * A dropdown component that displays a list of selectable items.
 * @component
 * @param {Object} props - The props object containing data for the dropdown.
 * @param {String} props.title - The title of the dropdown.
 * @param {Array} props.values - The list of selectable values for the dropdown.
 * @param {String} props.stateValue - The current selected value for the dropdown.
 * @param {Function} props.handleChange - The function to call when a value is selected from the dropdown.
 **/
function DropDown(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
        <Grid xs={12} >
          <FormControl sx={{mt:6, width:400}} >
            <InputLabel  >{props.title}</InputLabel>
            <Select
              // labelId="demo-controlled-open-select-label"
              // id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={props.stateValue}
              name={props.title}
              onChange={props.handleChange}
            > 

                {(props.values).map((value)=>(
                    <MenuItem value={value}>{value}</MenuItem>
                ))}
              {/* <MenuItem value=""
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>

    
  );
}export default DropDown;
