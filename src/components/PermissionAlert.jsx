import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import SecondaryButton from "./SecondaryButton";

// component: PermissionAlert
const PermissionAlert = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.handleCancelClick();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Permission needed!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please log in to proceed next step.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SecondaryButton text="Cancel" onClick={handleClose} autoFocus />
      </DialogActions>
    </Dialog>
  );
};

export default PermissionAlert;
