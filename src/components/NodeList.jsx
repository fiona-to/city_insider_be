import React from "react";
import { connect, useSelector } from "react-redux";
import { DeleteNode } from "../redux/actions/nodeAction";
import { useFirestoreConnect } from "react-redux-firebase";
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
import NodeListRow from "./NodeListRow";

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
const NodeList = (props) => {
  const classes = useStyles();

  // Connect to firestore's collection named "node"
  useFirestoreConnect(["node"]);
  const nodes = useSelector((state) => {
    return state.firestore.ordered.node;
  });

  const onNodeDelete = (selected) => {
    props.deleteNode(selected);
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
              Category
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
          {nodes &&
            nodes.map((item) => (
              <NodeListRow
                key={item.id}
                row={item}
                onNodeDelete={onNodeDelete}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNode: (node) => dispatch(DeleteNode(node)),
  };
};

export default connect(null, mapDispatchToProps)(NodeList);
