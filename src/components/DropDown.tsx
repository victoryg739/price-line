import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Grid, InputLabel } from "@mui/material";
type DropDownProps ={
    title:string
    values:string[]
}
function DropDown(props: DropDownProps) {
  const [age, setAge] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);



  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
    console.log(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
        <Grid xs={12} >
          <FormControl sx={{mt:10, width:400}}  required>
            <InputLabel id="demo-controlled-open-select-label">{props.title}</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              label="Age"
              onChange={handleChange}
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
