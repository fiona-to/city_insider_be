import React, { Fragment, useState } from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Box,
  Collapse,
  Table,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

import * as Color from "../_constant/color";
import CategoryEditForm from "./CategoryEditForm";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

// Styling
const useStyles = makeStyles({
  cell: {
    color: Color.text,
  },
  iconEdit: {
    fontSize: 28,
    color: lighten(Color.primary, 0.6),
    "&:hover": {
      color: Color.primary,
    },
  },
  iconDel: {
    marginLeft: "20px",
    fontSize: 28,
    color: lighten(Color.secondary, 0.6),
    "&:hover": {
      color: Color.secondary,
    },
  },
  iconClose: {
    fontSize: 28,
    backgroundColor: lighten(Color.secondary, 0.6),
    color: "white",
    "&:hover": {
      backgroundColor: Color.secondary,
    },
  },
  subRow: {
    backgroundColor: lighten(Color.primary, 0.85),
  },
});

// Component
const CategoryListRow = (props) => {
  const { row, onCategoryDelete } = props;
  const [open, setOpen] = useState(false);
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const classes = useStyles();

  const handleDeleteClick = (row) => {
    //onCategoryDelete(row);
    setOpenDelDialog(true);
  };

  const handleEditClick = (row) => {
    setOpen(!open);
  };

  return (
    <Fragment>
      {openDelDialog ? <ConfirmDeleteDialog open={openDelDialog} /> : null}
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="right"
          className={classes.cell}
        >
          {row.name}
        </TableCell>
        <TableCell align="right" className={classes.cell}>
          {row.vietnamese}
        </TableCell>
        <TableCell align="right">
          <Checkbox checked={row.enable} color="primary" disabled={true} />
        </TableCell>
        <TableCell align="right">
          <EditIcon
            className={classes.iconEdit}
            onClick={() => handleEditClick(row)}
          />
          <DeleteIcon
            className={classes.iconDel}
            onClick={() => handleDeleteClick(row)}
          />
        </TableCell>
      </TableRow>
      <TableRow className={classes.subRow}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table>
                <TableCell colSpan={5}>
                  <CategoryEditForm row={row} />
                </TableCell>
                <TableCell colSpan={1}>
                  <CloseIcon
                    className={classes.iconClose}
                    onClick={() => setOpen(false)}
                  />
                </TableCell>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default CategoryListRow;
