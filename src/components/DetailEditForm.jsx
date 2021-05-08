import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { UpdateDetail } from "../redux/actions/detailAction";

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
  imgUrlBox: {
    color: Color.text,
    textAlign: "left",
    width: Width.lgBox,

    // Media query
    [theme.breakpoints.down("sm")]: {
      width: Width.smBox,
    },
  },
  lgTextBox: {
    color: Color.text,
    textAlign: "left",
    width: Width.lgBox,

    // Media query
    [theme.breakpoints.down("sm")]: {
      width: Width.smBox,
    },
  },
}));

// COMPONENT: DetailEditForm
const DetailEditForm = (props) => {
  const classes = useStyles();
  const { row } = props;
  const [isRequired, setIsRequired] = useState(false);
  const [detail, setDetail] = useState({
    id: null,
    name: "",
    rating: 1,
    enable: false,
    imgUrl: "",
    address: "",
    description: "",
    nodeType: "",
    nodeId: "",
    nodeName: "",
  });

  // connect to firebase's firestore
  useFirestoreConnect(["node"]);
  const nodes = useSelector((state) => {
    return state.firestore.ordered.node;
  });

  useEffect(() => {
    setDetail({
      id: row.id,
      name: row.name,
      rating: row.rating,
      enable: row.enable,
      imgUrl: row.imgUrl,
      address: row.address,
      description: row.description,
      nodeId: row.nodeType.nodeId,
      nodeName: row.nodeType.nodeName,
      nodeType: `${row.nodeType.nodeId}-${row.nodeType.nodeName}`,
    });
  }, [row]);

  const handleValueChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });

    if (e.target.name === "nodeType") {
      const selectedNode = e.target.value.split("-");
      setDetail({
        ...detail,
        nodeType: e.target.value,
        nodeId: selectedNode[0],
        nodeName: selectedNode[1],
      });
    }

    if (e.target.name === "enable") {
      setDetail({ ...detail, enable: e.target.checked });
    }
  };

  const handleClearTextFields = () => {
    setDetail({
      ...detail,
      name: "",
      rating: 1,
      enable: false,
      imgUrl: "",
      address: "",
      description: "",
      nodeType: "",
      nodeId: "",
      nodeName: "",
    });
    setIsRequired(false);
  };

  const handleOnUpdateClick = (e) => {
    e.preventDefault();
    if (
      detail.name &&
      detail.imgUrl &&
      detail.address &&
      detail.description &&
      detail.nodeId
    ) {
      props.updateDetail({
        id: detail.id,
        payload: {
          name: detail.name,
          rating: detail.rating,
          enable: detail.enable,
          imgUrl: detail.imgUrl,
          address: detail.address,
          description: detail.description,
          nodeType: {
            nodeId: detail.nodeId,
            nodeName: detail.nodeName,
          },
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
        name="name"
        value={detail.name}
        onChange={handleValueChange}
        required={true}
        error={isRequired && !detail.name}
      />
      <FormControl required>
        <InputLabel id="lblNodeId">Node</InputLabel>
        <Select
          labelId="lblNodeId"
          id="nodeType"
          name="nodeType"
          value={detail.nodeType}
          onChange={handleValueChange}
          required={true}
          error={isRequired && !detail.nodeType}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {nodes &&
            nodes.map((item) => {
              return (
                <MenuItem key={item.id} value={`${item.id}-${item.name}`}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <br />
      <TextField
        id="rating"
        name="rating"
        value={detail.rating}
        type="number"
        onChange={handleValueChange}
        InputProps={{
          inputProps: {
            max: 5,
            min: 1,
          },
        }}
        label="Rating"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="enable"
            name="enable"
            checked={detail.enable}
            onChange={handleValueChange}
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
        name="imgUrl"
        label="Image Url"
        value={detail.imgUrl}
        className={classes.lgTextBox}
        onChange={handleValueChange}
        required={true}
        error={isRequired && !detail.imgUrl}
      />
      <br />
      <TextField
        id="address"
        name="address"
        label="Address"
        value={detail.address}
        className={classes.lgTextBox}
        onChange={handleValueChange}
        required={true}
        error={isRequired && !detail.address}
      />
      <br />
      <TextField
        id="description"
        name="description"
        label="Description"
        value={detail.description}
        className={classes.lgTextBox}
        onChange={handleValueChange}
        multiline
        rows={4}
        required={true}
        error={isRequired && !detail.description}
      />
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
    updateDetail: (detail) => dispatch(UpdateDetail(detail)),
  };
};

export default connect(null, mapDispatchToProps)(DetailEditForm);
