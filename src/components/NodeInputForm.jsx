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
      textAlign: "left",
    },
    // Media Query
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        width: Width.smBox,
      },
    },
  },
  header: {
    color: Color.text,
    marginTop: "12px",

    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smHeader,
    },
  },
  imgUrlBox: {
    color: Color.text,
    textAlign: "left",
    width: Width.lgBox,

    // Media query
    [theme.breakpoints.down("sm")]: {
      width: Width.smBox,
    },
  },
}));

// COMPONENT: NodeInputForm
const NodeInputForm = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [enable, setEnable] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [catType, setCatType] = useState("");
  const [catId, setCatId] = useState("");
  const [catName, setCatName] = useState("");
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
    setCatType(e.target.value);

    const selectedCategory = e.target.value.split("-");
    setCatId(selectedCategory[0]);
    setCatName(selectedCategory[1]);
  };

  const handleClearTextFields = () => {
    setName("");
    setVietnamese("");
    setImgUrl("");
    setCatType("");
    setCatId("");
    setCatName("");
    setEnable(false);
    setIsRequired(false);
  };

  const handleOnCreateClick = (e) => {
    e.preventDefault();
    if (name && vietnamese && imgUrl && catId) {
      props.createNode({
        name,
        vietnamese,
        imgUrl,
        enable,
        catType: { catId, catName },
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
        <FormControl required>
          <InputLabel id="lblCatId">Category</InputLabel>
          <Select
            labelId="lblCatId"
            id="catType"
            value={catType}
            onChange={handleCategoryTypeChange}
            required={true}
            error={isRequired && !catType}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories &&
              categories.map((item) => {
                return (
                  <MenuItem key={item.id} value={`${item.id}-${item.name}`}>
                    {item.name}
                  </MenuItem>
                );
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
        />
        <br />
        <TextField
          id="imgUrl"
          label="Image Url"
          value={imgUrl}
          className={classes.imgUrlBox}
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
