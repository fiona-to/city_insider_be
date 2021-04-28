import React from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { DeleteCategory } from "../redux/actions/categoryAction";
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
import * as FontSize from "../_constant/fontSize";
import CategoryListRow from "./CategoryListRow";

// Styling
const useStyles = makeStyles((theme) => ({
  container: {
    width: "98%",
    marginTop: "40px auto",
    border: "1px solid #9da2ab",
  },
  table: {
    //minWidth: 200,
  },
  header: {
    backgroundColor: Color.primary,
    color: "white",

    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smTblHeader,
    },
  },
}));

// Component
const CategoryList = (props) => {
  const classes = useStyles();

  // Connect to firestore's collection named "category"
  useFirestoreConnect(["category"]);
  const category = useSelector((state) => {
    return state.firestore.ordered.category;
  });

  const onCategoryDelete = (selected) => {
    props.deleteCategory(selected);
  };

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
            <TableCell align="right" className={classes.header}>
              Admin
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category &&
            category.map((item) => (
              <CategoryListRow
                key={item.id}
                row={item}
                onCategoryDelete={onCategoryDelete}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCategory: (selected) => dispatch(DeleteCategory(selected)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryList);
