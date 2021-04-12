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

// Styling
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    width: "100%",
    margin: "10px auto",
    border: "1px solid #9da2ab",
  },
  text: {
    color: Color.text,
  },
  checkbox: {
    color: Color.text,
  },
}));

// COMPONENT: CategoryEditForm
const CategoryEditForm = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [enable, setEnable] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const { row } = props;

  useEffect(() => {
    setId(row.id);
    setName(row.name);
    setVietnamese(row.vietnamese);
    setEnable(row.enable);
  }, [row]);

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

  const handleOnUpdateClick = (e) => {
    e.preventDefault();
    if (name && vietnamese) {
      props.updateCategory({ id, name, vietnamese, enable });
      handleClearTextFields();
    } else {
      setIsRequired(true);
      return;
    }
  };

  return (
    <div className={classes.container}>
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
          onClick={handleOnUpdateClick}
        >
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCategory: (category) => dispatch(UpdateCategory(category)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryEditForm);
