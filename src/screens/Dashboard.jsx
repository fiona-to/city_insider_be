import React from "react";
import { Route } from "react-router-dom";
import Category from "./Category";
import Node from "./Node";
import Detail from "./Detail";
import Login from "./Login";
import { makeStyles } from "@material-ui/core/styles";

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
  },
}));

// Component
const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Route exact path="/" component={Category} />
      <Route path="/category" component={Category} />
      <Route path="/node" component={Node} />
      <Route path="/detail" component={Detail} />
      <Route path="/login" component={Login} />
    </div>
  );
};

export default Dashboard;
