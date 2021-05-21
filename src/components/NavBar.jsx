import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../redux/actions/authAction";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Avatar, Tooltip } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";

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
    justifyContent: "flex-start",
    listStyle: "none",
  },
  menuItem: {
    flexGrow: 1,
    alignSelf: "center",
  },
  menuItem__link: {
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
  menuLink__selected: {
    color: Color.white,
    backgroundColor: Color.secondary,
    borderRadius: "5px",
    boxShadow: "1px 1px 8px #eeeeee",

    "&:hover": {
      color: Color.white,
      borderBottom: "none",
    },
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  logo__icon: {
    color: Color.secondary,
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  logo__text: {
    color: Color.secondary,
    fontSize: "12px",
    fontWeight: "bold",

    // Media Query
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
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
  menuAuth__avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),

    // Media Query
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  menuAuth__logInOut: {
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
  hiddenText: {
    // Media Query
    [theme.breakpoints.down("sm")]: {
      display: "none",
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
        <Avatar
          alt="Guest"
          src={profile.imgUrl}
          className={classes.menuAuth__avatar}
        />
      </div>
      <div className={[classes.menuAuth__item, classes.hiddenText].join(" ")}>
        Hi Guest
      </div>
      <div className={classes.menuAuth__item}>
        <NavLink to="/signin" className={classes.menuAuth__logInOut}>
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
          className={classes.menuAuth__avatar}
        />
      </div>
      <div className={[classes.menuAuth__item, classes.hiddenText].join(" ")}>
        Hi {profile.firstName}
      </div>
      <div className={classes.menuAuth__item}>
        <a className={classes.menuAuth__logInOut} onClick={onSignOutClick}>
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
            <li className={classes.logo}>
              <div>
                <EmojiFoodBeverageIcon className={classes.logo__icon} />
              </div>
              <div className={classes.logo__text}>City Insider</div>
            </li>
            <li className={classes.menuItem}>
              <NavLink
                to="/category"
                className={classes.menuItem__link}
                activeClassName={classes.menuLink__selected}
              >
                Category
              </NavLink>
            </li>

            <li className={classes.menuItem}>
              <NavLink
                to="/node"
                className={classes.menuItem__link}
                activeClassName={classes.menuLink__selected}
              >
                Node
              </NavLink>
            </li>

            <li className={classes.menuItem}>
              <NavLink
                to="/detail"
                className={classes.menuItem__link}
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
