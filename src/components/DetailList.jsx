// Third party components, libs
import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { DeleteDetail } from "../redux/actions/detailAction";
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
import { sortArrayByNodeName } from "../utils/array_helper";
import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";
import DetailListRow from "./DetailListRow";

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
 *  Component: DetailList
 *
 */
const DetailList = (props) => {
  const classes = useStyles();
  let details = [];

  // Connect to firestore's collection named "node"
  useFirestoreConnect(["detail"]);
  const fbResult = useSelector((state) => {
    return state.firestore.ordered.detail;
  });

  // Sort details
  if (fbResult && fbResult.length > 0) {
    details = [...fbResult];
    details.sort(sortArrayByNodeName);
  }

  const onDetailDelete = (selected) => {
    props.deleteDetail(selected);
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
                Rating
              </TableCell>
            ) : null}
            {/* Only showing column if screen width is from "md", "lg" */}
            {isWidthUp("sm", props.width) ? (
              <TableCell align="right" className={classes.header}>
                Node
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
          {details &&
            details.map((item) => (
              <DetailListRow
                className={classes.gridRow}
                key={item.id}
                row={item}
                onDetailDelete={onDetailDelete}
              />
            ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

DetailList.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDetail: (detail) => dispatch(DeleteDetail(detail)),
  };
};

export default withWidth()(connect(null, mapDispatchToProps)(DetailList));
