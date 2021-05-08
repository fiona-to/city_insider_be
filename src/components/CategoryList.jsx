import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { DeleteCategory } from "../redux/actions/categoryAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";
import CategoryListRow from "./CategoryListRow";

// Styling
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(1),
  },
  gridRow: {
    gridColumnEnd: "span 12",
  },
  header: {
    backgroundColor: Color.primary,
    color: "white",
    gridColumnEnd: "span 2",

    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smTblHeader,
    },
  },
}));

// Component: CategoryList
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
    <Grid item xs={12}>
      <Table aria-label="simple table" className={classes.gridRow}>
        <TableHead className={classes.gridRow}>
          <TableRow className={classes.header}>
            <TableCell align="right" className={classes.header}>
              &nbsp;
            </TableCell>
            <TableCell align="right" className={classes.header}>
              Name
            </TableCell>
            {/* Only showing column if screen width is from "md", "lg" */}
            {isWidthUp("sm", props.width) ? (
              <TableCell align="right" className={classes.header}>
                Vietnamese
              </TableCell>
            ) : null}
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
                className={classes.gridRow}
                key={item.id}
                row={item}
                onCategoryDelete={onCategoryDelete}
              />
            ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

CategoryList.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCategory: (selected) => dispatch(DeleteCategory(selected)),
  };
};

export default withWidth()(connect(null, mapDispatchToProps)(CategoryList));
