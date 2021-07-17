// Third party components, libs
import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { DeleteNode } from "../redux/actions/nodeAction";
import { useFirestoreConnect } from "react-redux-firebase";
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

// Custom components
import { sortArrayByCatName } from "../utils/array_helper";
import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";
import NodeListRow from "./NodeListRow";

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

    //Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smTblHeader,
    },
  },
}));

/**
 *  Component: NodeList
 *
 */
const NodeList = (props) => {
  const classes = useStyles();
  let nodes = [];

  // Connect to firestore's collection named "node"
  useFirestoreConnect(["node"]);
  const fbResult = useSelector((state) => {
    return state.firestore.ordered.node;
  });

  // Sort nodes
  if (fbResult && fbResult.length > 0) {
    nodes = [...fbResult];
    nodes.sort(sortArrayByCatName);
  }

  const onNodeDelete = (selected) => {
    props.deleteNode(selected);
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
            {/* Only showing column if screen width is from "md", "lg" */}
            {isWidthUp("sm", props.width) ? (
              <TableCell align="right" className={classes.header}>
                Category
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
          {nodes &&
            nodes.map((item) => (
              <NodeListRow
                className={classes.gridRow}
                key={item.id}
                row={item}
                onNodeDelete={onNodeDelete}
              />
            ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

NodeList.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNode: (node) => dispatch(DeleteNode(node)),
  };
};

export default withWidth()(connect(null, mapDispatchToProps)(NodeList));
