import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

// component: ConfirmDeleteDialog
const ConfirmDeleteDialog = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.handleCancelDeleteClick();
  };

  const handleAgreeDelete = () => {
    setOpen(false);
    props.handleAgreeDelete();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure to delete?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Once you agree to delete, you are not able to undo!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SecondaryButton text="Agree" onClick={handleAgreeDelete} />
        <PrimaryButton text="Cancel" onClick={handleClose} autoFocus />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
