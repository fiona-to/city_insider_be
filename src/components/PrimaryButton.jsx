import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, lighten } from "@material-ui/core";

import * as Color from "../_constant/color";

// Styling
const useStyles = makeStyles((theme) => ({
  primary: {
    backgroundColor: lighten(Color.primary, 0.2),
    color: Color.white,

    "&:hover": {
      backgroundColor: Color.primary,
    },
  },
}));

// Component: PrimaryButton
const PrimaryButton = ({ text, onClick, otherProps }) => {
  const classes = useStyles();
  return (
    <Button
      {...otherProps}
      variant="contained"
      className={classes.primary}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
