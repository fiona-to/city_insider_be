import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { CreateNode } from "../redux/actions/nodeAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
} from "@material-ui/core";

import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";

// Styling
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",

      // Media Query
      [theme.breakpoints.down("sm")]: {
        width: "21ch",
      },
    },
  },
  container: {
    width: "100%",
    margin: "10px auto",
    border: "1px solid #9da2ab",
    textAlign: "center",
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
  selectCatBox: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  imgUrlBox: {
    textAlign: "center",
  },
}));

// COMPONENT: NodeInputForm
const NodeInputForm = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [enable, setEnable] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [catId, setCatId] = useState(null);
  const [isRequired, setIsRequired] = useState(false);

  // connect to firebase's firestore
  useFirestoreConnect(["category"]);
  const categories = useSelector((state) => {
    return state.firestore.ordered.category;
  });

  const handleNameChanged = (e) => {
    setName(e.target.value);
  };

  const handleVietnameseChange = (e) => {
    setVietnamese(e.target.value);
  };

  const handleEnableChange = (e) => {
    setEnable(e.target.checked);
  };

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handleCategoryTypeChange = (e) => {
    setCatId(e.target.value);
  };

  const handleClearTextFields = () => {
    setName("");
    setVietnamese("");
    setImgUrl("");
    setCatId(null);
    setEnable(false);
    setIsRequired(false);
  };

  const handleOnCreateClick = (e) => {
    e.preventDefault();
    if (name && vietnamese && imgUrl && catId) {
      props.createNode({ name, vietnamese, imgUrl, enable, catId });
      handleClearTextFields();
    } else {
      setIsRequired(true);
      return;
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Node
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
        <br />
        <FormControl required className={classes.selectCatBox}>
          <InputLabel id="lblCatId">Category</InputLabel>
          <Select
            labelId="lblCatId"
            id="catId"
            value={catId}
            onChange={handleCategoryTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories &&
              categories.map((item) => {
                return <MenuItem value={item.id}>{item.name}</MenuItem>;
              })}
          </Select>
        </FormControl>
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
        <TextField
          id="imgUrl"
          label="Image Url"
          value={imgUrl}
          onChange={handleImgUrlChange}
          required={true}
          error={isRequired && !imgUrl}
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
    createNode: (node) => dispatch(CreateNode(node)),
  };
};

export default connect(null, mapDispatchToProps)(NodeInputForm);