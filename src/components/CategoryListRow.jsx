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
  TableBody,
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
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: Color.secondary,
    },
  },
  subRow: {
    backgroundColor: lighten(Color.primary, 0.85),
  },
  subCell: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  btnClose: {
    marginTop: "-70px",
    marginLeft: "-18px",
  },
});

// Component
const CategoryListRow = (props) => {
  const { row, onCategoryDelete } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [deletedRow, setDeletedRow] = useState(null);
  const classes = useStyles();

  const handleEditClick = (row) => {
    setOpenEdit(!openEdit);
  };

  const handleDeleteButtonClick = (row) => {
    setDeletedRow(row);
    setOpenDelDialog(true);
  };

  const handleCancelDeleteClick = () => {
    setDeletedRow(null);
    setOpenDelDialog(false);
  };

  const handleAgreeDelete = () => {
    onCategoryDelete(deletedRow);
    setDeletedRow(null);
    setOpenDelDialog(false);
  };

  return (
    <Fragment>
      {openDelDialog ? (
        <ConfirmDeleteDialog
          open={openDelDialog}
          handleCancelDeleteClick={handleCancelDeleteClick}
          handleAgreeDelete={handleAgreeDelete}
        />
      ) : null}
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {openEdit ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
            onClick={() => handleDeleteButtonClick(row)}
          />
        </TableCell>
      </TableRow>
      <TableRow className={classes.subRow}>
        <TableCell className={classes.subCell} colSpan={5}>
          <Collapse
            in={openEdit}
            timeout="auto"
            unmountOnExit
            disableStrictModeCompat={true}
          >
            <Box margin={1}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className={classes.subCell}>
                      <CategoryEditForm row={row} />
                    </TableCell>
                    <TableCell colSpan={1}>
                      <div className={classes.btnClose}>
                        <CloseIcon
                          className={classes.iconClose}
                          onClick={() => setOpenEdit(false)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default CategoryListRow;
