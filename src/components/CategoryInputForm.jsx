import React, { useState } from "react";
import { connect } from "react-redux";
import { CreateCategory } from "../redux/actions/categoryAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import * as Color from "../_constant/color";
import * as Width from "../_constant/width";
import * as FontSize from "../_constant/fontSize";

// Styling
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "10px auto",
    border: "1px solid #9da2ab",
    textAlign: "center",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: Width.mdBox,

      // Media Query
      [theme.breakpoints.down("sm")]: {
        width: Width.smBox,
      },
    },
  },
  text: {
    color: Color.text,
  },
  header: {
    color: Color.text,
    marginTop: "12px",

    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smHeader,
    },
  },
  checkbox: {
    color: Color.text,
  },
}));

// COMPONENT: CategoryInputForm
const CategoryInputForm = (props) => {
  const classes = useStyles();
  const [isRequired, setIsRequired] = useState(false);
  const [cat, setCat] = useState({
    name: "",
    vietnamese: "",
    enable: false,
  });

  const handleValueChange = (e) => {
    setCat({
      ...cat,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "enable") {
      setCat({ ...cat, enable: e.target.checked });
    }
  };

  const handleClearTextFields = () => {
    setIsRequired(false);
    setCat({
      name: "",
      vietnamese: "",
      enable: false,
    });
  };

  const handleOnCreateClick = (e) => {
    e.preventDefault();
    if (cat.name && cat.vietnamese) {
      props.createCategory({
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
    <div className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Category
      </Typography>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnCreateClick}
        >
          Create
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearTextFields}
        >
          Clear
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (category) => dispatch(CreateCategory(category)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryInputForm);
