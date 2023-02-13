import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Grid, InputLabel } from "@mui/material";
import { FunctionBody, FunctionDeclaration } from "typescript";


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
