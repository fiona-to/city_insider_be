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

// Styling
const useStyles = makeStyles({
  container: {
    margin: "10px 100px",
    border: "1px solid #9da2ab",
  },
  table: {
    minWidth: 200,
    width: "80%",
  },
});

// Component
const CategoryList = (props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Vietnamese</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.category.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row" align="right">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.vietnamese}</TableCell>
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
