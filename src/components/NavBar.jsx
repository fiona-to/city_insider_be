import React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core";

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
const NavBar = () => {
  const classes = useStyles();
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

          {/* <Typography className={classes.menuText}>
            <NavLink
              to="/login"
              className={classes.menuLink}
              activeClassName={classes.selectedLink}
            >
              Login
            </NavLink>
          </Typography> */}

          {/* <Typography className={classes.menuText}>
            <NavLink
              to="/logout"
              className={classes.menuLink}
              activeClassName={classes.selectedLink}
            >
              Logout
            </NavLink>
          </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
