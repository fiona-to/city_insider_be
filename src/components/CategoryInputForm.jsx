import React, { useState } from "react";
import { connect } from "react-redux";
import { CreateCategory } from "../redux/actions/categoryAction";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

import * as Color from "../_constant/color";

// Styling
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    width: "80%",
    margin: "10px 100px",
    border: "1px solid #9da2ab",
  },
  text: {
    color: Color.text,
  },
}));

// COMPONENT: CategoryInputForm
const CategoryInputForm = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [vietnamese, setVietnamese] = useState("");

  const handleNameChanged = (e) => {
    setName(e.target.value);
  };

  const handleVietnameseChange = (e) => {
    setVietnamese(e.target.value);
  };

  const handleClearTextFields = () => {
    setName("");
    setVietnamese("");
  };

  const handleOnCreateClick = (e) => {
    e.preventDefault();
    props.create({ name, vietnamese });
    handleClearTextFields();
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.text}>
        Category
      </Typography>
      <form className={classes.form}>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={handleNameChanged}
        />
        <TextField
          id="vietnamese"
          label="Vietnamese"
          value={vietnamese}
          onChange={handleVietnameseChange}
        />
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
    create: (category) => dispatch(CreateCategory(category)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryInputForm);
