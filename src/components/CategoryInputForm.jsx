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
      width: "30ch",

      // Media Query
      [theme.breakpoints.down("sm")]: {
        width: "25ch",
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
  const [name, setName] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [enable, setEnable] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const handleNameChanged = (e) => {
    setName(e.target.value);
  };

  const handleVietnameseChange = (e) => {
    setVietnamese(e.target.value);
  };

  const handleClearTextFields = () => {
    setName("");
    setVietnamese("");
    setEnable(false);
    setIsRequired(false);
  };

  const handleEnableChange = (e) => {
    setEnable(e.target.checked);
  };

  const handleOnCreateClick = (e) => {
    e.preventDefault();
    if (name && vietnamese) {
      props.createCategory({ name, vietnamese, enable });
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
          label="Name"
          value={name}
          onChange={handleNameChanged}
          required={true}
          error={isRequired && !name}
        />
        <TextField
          id="vietnamese"
          label="Vietnamese"
          value={vietnamese}
          onChange={handleVietnameseChange}
          required={true}
          error={isRequired && !vietnamese}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={enable}
              onChange={handleEnableChange}
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
