import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../redux/actions/authAction";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";

// Styling
const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  menuText: {
    flexGrow: 1,
  },
  menuLink: {
    color: "#b0bec5",
    textDecoration: "none",
    padding: "6px 20px",

    "&:hover": {
      color: "white",
      borderBottom: "1px solid white",
    },

    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smAppBar,
      padding: "6px 10px",
    },
  },
  selectedLink: {
    color: "white",
    backgroundColor: Color.secondary,
    borderRadius: "5px",
    boxShadow: "1px 1px 8px #eeeeee",
  },
}));

// Component
const NavBar = (props) => {
  const classes = useStyles();
  const { fbAuth } = props;
  const onSignOutClick = () => {
    props.signOut();
  };

  const authLink = !fbAuth.uid ? (
    <Typography className={classes.menuText}>
      <NavLink
        to="/signin"
        className={classes.menuLink}
        activeClassName={classes.selectedLink}
      >
        Log In
      </NavLink>
    </Typography>
  ) : (
    <Typography className={classes.menuText}>
      <a className={classes.menuLink} onClick={onSignOutClick}>
        Log Out
      </a>
    </Typography>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.menuText}>
            <NavLink
              to="/category"
              className={classes.menuLink}
              activeClassName={classes.selectedLink}
            >
              Category
            </NavLink>
          </Typography>

          <Typography className={classes.menuText}>
            <NavLink
              to="/node"
              className={classes.menuLink}
              activeClassName={classes.selectedLink}
            >
              Node
            </NavLink>
          </Typography>

          <Typography className={classes.menuText}>
            <NavLink
              to="/detail"
              className={classes.menuLink}
              activeClassName={classes.selectedLink}
            >
              Detail
            </NavLink>
          </Typography>

          {authLink}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fbAuth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
