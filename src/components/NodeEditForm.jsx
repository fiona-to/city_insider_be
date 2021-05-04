import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { UpdateNode } from "../redux/actions/nodeAction";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
} from "@material-ui/core";

import * as Color from "../_constant/color";

// Styling
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    margin: "10px auto",
    border: "1px solid #9da2ab",
    textAlign: "center",

    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },

    // Media query
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        width: "28ch",
      },
    },
  },
  text: {
    color: Color.text,
    textAlign: "left",
  },
  imgUrlBox: {
    color: Color.text,
    textAlign: "left",
    width: "60ch",

    // Media query
    [theme.breakpoints.down("sm")]: {
      width: "28ch",
    },
  },
}));

// COMPONENT: NodeEditForm
const NodeEditForm = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [enable, setEnable] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [catType, setCatType] = useState("");
  const [catId, setCatId] = useState("");
  const [catName, setCatName] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const { row } = props;

  // connect to firebase's firestore
  useFirestoreConnect(["category"]);
  const categories = useSelector((state) => {
    return state.firestore.ordered.category;
  });

  useEffect(() => {
    setId(row.id);
    setName(row.name);
    setVietnamese(row.vietnamese);
    setEnable(row.enable);
    setImgUrl(row.imgUrl);
    setCatId(row.catType.catId);
    setCatName(row.catType.catName);
    setCatType(`${row.catType.catId}-${row.catType.catName}`);
  }, [row]);

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

  const handleOnUpdateClick = (e) => {
    e.preventDefault();
    if (name && vietnamese && imgUrl && catId) {
      props.updateNode({
        id,
        payload: {
          name,
          vietnamese,
          imgUrl,
          enable,
          catType: { catId, catName },
        },
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
          id="catId"
          value={catType}
          onChange={handleCategoryTypeChange}
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
    updateNode: (node) => dispatch(UpdateNode(node)),
  };
};

export default connect(null, mapDispatchToProps)(NodeEditForm);
