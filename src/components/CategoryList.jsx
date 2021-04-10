import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import * as Color from "../_constant/color";
import CategoryListRow from "./CategoryListRow";

// Styling
const useStyles = makeStyles({
  container: {
    width: "80%",
    margin: "40px 100px",
    border: "1px solid #9da2ab",
  },
  table: {
    minWidth: 200,
  },
  header: {
    backgroundColor: Color.primary,
    color: "white",
  },
});

// Component
const CategoryList = (props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell align="right" className={classes.header}>
              &nbsp;
            </TableCell>
            <TableCell align="right" className={classes.header}>
              Name
            </TableCell>
            <TableCell align="right" className={classes.header}>
              Vietnamese
            </TableCell>
            <TableCell align="right" className={classes.header}>
              Enabled
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.category.map((item) => (
            <CategoryListRow key={item.name} row={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    category: state.category.category,
  };
};

export default connect(mapStateToProps)(CategoryList);
