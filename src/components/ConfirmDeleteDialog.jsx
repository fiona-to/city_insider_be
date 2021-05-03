import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

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
        <Button
          onClick={handleAgreeDelete}
          color="secondary"
          variant="contained"
        >
          Agree
        </Button>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
