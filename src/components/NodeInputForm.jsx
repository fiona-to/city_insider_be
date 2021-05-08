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
  const [isRequired, setIsRequired] = useState(false);
  const [node, setNode] = useState({
    name: "",
    vietnamese: "",
    enable: false,
    imgUrl: "",
    catType: "",
    catId: "",
    catName: "",
  });

  // connect to firebase's firestore
  useFirestoreConnect(["category"]);
  const categories = useSelector((state) => {
    return state.firestore.ordered.category;
  });

  const handleValueChange = (e) => {
    setNode({ ...node, [e.target.name]: e.target.value });

    if (e.target.name === "catType") {
      const selectedCat = e.target.value.split("-");
      setNode({
        ...node,
        catType: e.target.value,
        catId: selectedCat[0],
        catName: selectedCat[1],
      });
    }

    if (e.target.name === "enable") {
      setNode({ ...node, enable: e.target.checked });
    }
  };

  const handleClearTextFields = () => {
    setNode({
      name: "",
      vietnamese: "",
      enable: false,
      imgUrl: "",
      catType: "",
      catId: "",
      catName: "",
    });
  };

  const handleOnCreateClick = (e) => {
    e.preventDefault();
    if (node.name && node.vietnamese && node.imgUrl && node.catId) {
      props.createNode({
        name: node.name,
        vietnamese: node.vietnamese,
        imgUrl: node.imgUrl,
        enable: node.enable,
        catType: { catId: node.catId, catName: node.catName },
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
          name="name"
          label="Name"
          value={node.name}
          onChange={handleValueChange}
          required={true}
          error={isRequired && !node.name}
        />
        <TextField
          id="vietnamese"
          name="vietnamese"
          label="Vietnamese"
          value={node.vietnamese}
          onChange={handleValueChange}
          required={true}
          error={isRequired && !node.vietnamese}
        />
        <br />
        <FormControl required>
          <InputLabel id="lblCatId">Category</InputLabel>
          <Select
            labelId="lblCatId"
            id="catType"
            name="catType"
            value={node.catType}
            onChange={handleValueChange}
            required={true}
            error={isRequired && !node.catType}
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
              id="enable"
              name="enable"
              checked={node.enable}
              onChange={handleValueChange}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          label="Enabled"
        />
        <br />
        <TextField
          id="imgUrl"
          name="imgUrl"
          label="Image Url"
          value={node.imgUrl}
          className={classes.imgUrlBox}
          onChange={handleValueChange}
          required={true}
          error={isRequired && !node.imgUrl}
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
