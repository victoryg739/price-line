/**
 * AlertDialog.js
 *
 * AlertDialog component is a reusable dialog component that uses Material-UI components
 * to create a customizable alert dialog. This dialog can be used to display important
 * information to the user and requires a user action to be dismissed.
 *
 * The component uses Material-UI Dialog components such as:
 * - Dialog
 * - DialogTitle
 * - DialogContent
 * - DialogContentText
 * - DialogActions
 * - Button
 *
 * @module AlertDialog
 * @exports AlertDialog
 */

import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function AlertDialog() {
    const [open, setOpen] = React.useState(false);

  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (

        <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    );
}

export default AlertDialog