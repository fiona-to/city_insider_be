import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Box,
  Collapse,
  Typography,
  Table,
  TableBody,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import * as Color from "../_constant/color";

// Styling
const useStyles = makeStyles({
  cell: {
    color: Color.text,
  },
  subRow: {
    backgroundColor: "#bdbdbd",
  },
});

// Component
const CategoryListRow = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
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
      </TableRow>
      <TableRow className={classes.subRow}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Viewing / Editing
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.vietnamese}</TableCell>
                    <TableCell align="right">
                      <Checkbox checked={row.enable} color="primary" />
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
