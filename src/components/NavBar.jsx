import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../redux/actions/authAction";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Avatar, Tooltip } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import * as Color from "../_constant/color";
import * as FontSize from "../_constant/fontSize";

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuList: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-around",
    listStyle: "none",
  },
  menuAuth: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuAuth__item: {
    alignSelf: "center",
    paddingRight: "10px",

    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smAppBar,
    },
  },
  menuItem: {
    flexGrow: 1,
    alignSelf: "center",
  },
  logInOut: {
    color: Color.menuText,

    "&:hover": {
      color: Color.secondary,
      cursor: "pointer",
    },
    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smAppBar,
    },
  },
  menuLink: {
    color: Color.menuText,
    textDecoration: "none",
    padding: "6px 20px",

    "&:hover": {
      color: Color.secondary,
      borderBottom: `1px solid ${Color.secondary}`,
    },

    // Media Query
    [theme.breakpoints.down("sm")]: {
      fontSize: FontSize.smAppBar,
      padding: "6px 10px",
    },
  },
  selectedLink: {
    color: Color.white,
    backgroundColor: Color.secondary,
    borderRadius: "5px",
    boxShadow: "1px 1px 8px #eeeeee",

    "&:hover": {
      color: Color.white,
      borderBottom: "none",
    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),

    // Media Query
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}));

// Component
const NavBar = (props) => {
  const classes = useStyles();
  const { fbAuth, profile } = props;

  const onSignOutClick = () => {
    props.signOut();
  };

  const authLink = !fbAuth.uid ? (
    <div className={classes.menuAuth}>
      <div className={classes.menuAuth__item}>
        <Avatar alt="Guest" src={profile.imgUrl} className={classes.avatar} />
      </div>
      <div className={classes.menuAuth__item}>Hi Guest</div>
      <div className={classes.menuAuth__item}>
        <NavLink to="/signin" className={classes.logInOut}>
          <Tooltip title="Log In" aria-label="login">
            <KeyboardReturnIcon />
          </Tooltip>
        </NavLink>
      </div>
    </div>
  ) : (
    <div className={classes.menuAuth}>
      <div className={classes.menuAuth__item}>
        <Avatar
          alt={profile.initials}
          src={profile.imgUrl}
          className={classes.avatar}
        />
      </div>
      <div className={classes.menuAuth__item}>Hi {profile.firstName}</div>
      <div className={classes.menuAuth__item}>
        <a className={classes.logInOut} onClick={onSignOutClick}>
          <Tooltip title="Log Out" aria-label="logout">
            <ExitToAppIcon />
          </Tooltip>
        </a>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <ul className={classes.menuList}>
            <li className={classes.menuItem}>
              <NavLink
                to="/category"
                className={classes.menuLink}
                activeClassName={classes.selectedLink}
              >
                Category
              </NavLink>
            </li>
            <li className={classes.menuItem}>
              <NavLink
                to="/node"
                className={classes.menuLink}
                activeClassName={classes.selectedLink}
              >
                Node
              </NavLink>
            </li>
            <li className={classes.menuItem}>
              <NavLink
                to="/detail"
                className={classes.menuLink}
                activeClassName={classes.selectedLink}
              >
                Detail
              </NavLink>
            </li>
            <li className={classes.menuItem}> {authLink}</li>
          </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fbAuth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
