import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { TableCell, TableRow, Table, TableBody } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";

import NodeInputForm from "../components/NodeInputForm";
import NodeList from "../components/NodeList";

import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";

// Styling
const useStyles = makeStyles((theme) => ({
  iconAdd: {
    fontSize: FontSize.hugeIcon,
    margin: "20px auto",
    color: lighten(Color.green, 0.6),

    "&:hover": {
      color: Color.green,
    },
    // Media query
    [theme.breakpoints.down("sm")]: {
      margin: "5px auto",
    },
  },
  iconClose: {
    fontSize: FontSize.normIcon,
    backgroundColor: lighten(Color.secondary, 0.6),
    color: "white",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: Color.secondary,
    },
  },
  closeBtn: {
    marginTop: "-90px",
    marginLeft: "-20px",
    // Media query
    [theme.breakpoints.down("sm")]: {
      marginTop: "-120px",
    },
  },
}));

// COMPONENT: Node
const Node = () => {
  const classes = useStyles();
  const [isAdd, setIsAdd] = useState(false);

  return (
    <div>
      {isAdd ? (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>
                <NodeInputForm />
              </TableCell>
              <TableCell colSpan={1}>
                <div className={classes.closeBtn}>
                  <CloseIcon
                    className={classes.iconClose}
                    onClick={() => setIsAdd(false)}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <AddCircleOutlineIcon
          className={classes.iconAdd}
          onClick={() => {
            setIsAdd(true);
          }}
        />
      )}
      <NodeList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fbAuth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Node);
