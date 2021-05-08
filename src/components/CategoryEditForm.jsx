import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { UpdateCategory } from "../redux/actions/categoryAction";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import * as Color from "../_constant/color";
import * as Width from "../_constant/width";

// Styling
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    margin: "10px auto",
    border: "1px solid #9da2ab",
    textAlign: "center",

    "& > *": {
      margin: theme.spacing(1),
      width: Width.mdBox,
      textAlign: "left",
    },

    // Media query
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        width: Width.smBox,
      },
    },
  },
  checkbox: {
    color: Color.text,
  },
}));

// COMPONENT: CategoryEditForm
const CategoryEditForm = (props) => {
  const classes = useStyles();
  const [isRequired, setIsRequired] = useState(false);
  const [cat, setCat] = useState({
    id: null,
    name: "",
    vietnamese: "",
    enable: false,
  });
  const { row } = props;

  useEffect(() => {
    setCat({
      id: row.id,
      name: row.name,
      vietnamese: row.vietnamese,
      enable: row.enable,
    });
  }, [row]);

  const handleValueChange = (e) => {
    setCat({ ...cat, [e.target.name]: e.target.value });

    if (e.target.name === "enable") {
      setCat({ ...cat, enable: e.target.checked });
    }
  };

  const handleClearTextFields = () => {
    setIsRequired(false);
    setCat({ ...cat, name: "", vietnamese: "", enable: false });
  };

  const handleOnUpdateClick = (e) => {
    e.preventDefault();
    if (cat.name && cat.vietnamese) {
      props.updateCategory({
        id: cat.id,
        name: cat.name,
        vietnamese: cat.vietnamese,
        enable: cat.enable,
      });
      handleClearTextFields();
    } else {
      setIsRequired(true);
      return;
    }
  };

  return (
    <form className={classes.form}>
      <TextField
        id="name"
        name="name"
        label="Name"
        value={cat.name}
        onChange={handleValueChange}
        required={true}
        error={isRequired && !cat.name}
      />
      <TextField
        id="vietnamese"
        name="vietnamese"
        label="Vietnamese"
        value={cat.vietnamese}
        onChange={handleValueChange}
        required={true}
        error={isRequired && !cat.vietnamese}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="enable"
            name="enable"
            checked={cat.enable}
            onChange={handleValueChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="Enabled"
        className={classes.checkbox}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleOnUpdateClick}>
        Update
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearTextFields}
      >
        Clear
      </Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCategory: (category) => dispatch(UpdateCategory(category)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryEditForm);
