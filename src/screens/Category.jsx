import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import CategoryList from "../components/CategoryList";

// Styling
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
}));

// COMPONENT: Category
const Category = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CategoryList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fbAuth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Category);
