import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import * as Color from "../_constant/color";

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
  },
  cell: {
    color: Color.text,
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
            <TableCell align="right" className={classes.cell}>
              Name
            </TableCell>
            <TableCell align="right" className={classes.cell}>
              Vietnamese
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.category.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                component="th"
                scope="row"
                align="right"
                className={classes.cell}
              >
                {item.name}
              </TableCell>
              <TableCell align="right" className={classes.cell}>
                {item.vietnamese}
              </TableCell>
            </TableRow>
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
