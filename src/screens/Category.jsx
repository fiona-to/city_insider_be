import React, { useState } from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import { TableCell, TableRow, Table, TableBody } from "@material-ui/core";

import CategoryInputForm from "../components/CategoryInputForm";
import CategoryList from "../components/CategoryList";

import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";

// Styling
const useStyles = makeStyles((theme) => ({
  container: {},
  iconAdd: {
    fontSize: FontSize.hugeIcon,
    margin: "20px auto",
    color: lighten(Color.green, 0.6),

    "&:hover": {
      color: Color.green,
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
}));

// COMPONENT: Category
const Category = () => {
  const classes = useStyles();
  const [isAdd, setIsAdd] = useState(false);

  return (
    <div>
      {isAdd ? (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>
                <CategoryInputForm />
              </TableCell>
              <TableCell colSpan={1}>
                <div>
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
        // className="fa fa-plus-circle"
        // style={{ color: "green", fontSize: 48, margin: "20px auto" }}
        <AddCircleOutlineIcon
          className={classes.iconAdd}
          onClick={() => {
            setIsAdd(true);
          }}
        />
      )}
      <CategoryList />
    </div>
  );
};

export default Category;
