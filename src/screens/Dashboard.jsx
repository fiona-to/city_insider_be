import React from "react";
import { Switch, Route } from "react-router-dom";
import Category from "./Category";
import Node from "./Node";
import Detail from "./Detail";
import SignIn from "./SignIn";
import PageNotFound from "./PageNotFound";
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
      <Switch>
        <Route exact path="/" component={Category} />
        <Route path="/category" component={Category} />
        <Route path="/node" component={Node} />
        <Route path="/detail" component={Detail} />
        <Route path="/signin" component={SignIn} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default Dashboard;
