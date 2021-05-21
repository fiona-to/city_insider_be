import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
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
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";
import CategoryEditForm from "./CategoryEditForm";

// Styling
const useStyles = makeStyles((theme) => ({
  cell: {
    color: Color.text,
    gridColumnEnd: "span 2",
    gridRowGap: "wrap",
    maxWidth: "150px",

    // Media query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smText,
    },
  },
  iconEdit: {
    fontSize: FontSize.normIcon,
    color: lighten(Color.primary, 0.6),
    "&:hover": {
      color: Color.primary,
    },

    // Media query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smIcon,
    },
  },
  iconDel: {
    marginLeft: "20px",
    fontSize: FontSize.normIcon,
    color: lighten(Color.secondary, 0.6),
    "&:hover": {
      color: Color.secondary,
    },

    // Media query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smIcon,
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
  gridRow: {
    gridColumnEnd: "span 12",
  },
  gridSubRow: {
    gridColumnEnd: "span 12",
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
}));

// Component: CategoryListRow
const CategoryListRow = (props) => {
  const { row } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const classes = useStyles();

  const handleEditClick = (row) => {
    setOpenEdit(!openEdit);
  };

  return (
    <Fragment>
      <TableRow className={classes.gridRow}>
        <TableCell className={classes.cell}>
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
        {/* Only showing column if screen width is from "md", "lg" */}
        {isWidthUp("sm", props.width) ? (
          <TableCell align="right" className={classes.cell}>
            {row.vietnamese}
          </TableCell>
        ) : null}
        <TableCell align="right" className={classes.cell}>
          <Checkbox checked={row.enable} color="primary" disabled={true} />
        </TableCell>
        <TableCell align="right" className={classes.cell}>
          <EditIcon
            className={classes.iconEdit}
            onClick={() => handleEditClick(row)}
          />
        </TableCell>
      </TableRow>
      <TableRow className={classes.gridSubRow}>
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

CategoryListRow.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(CategoryListRow);
