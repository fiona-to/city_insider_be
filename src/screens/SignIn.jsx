import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../redux/actions/authAction";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

import * as Color from "../_constant/color";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

// Styling
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    width: "80%",
    margin: "10px auto",
    border: "1px solid #9da2ab",
  },
  text: {
    color: Color.text,
  },
  errMsg: {
    color: Color.errMsg,
    margin: "20px auto",
  },
}));

// Component
const SignIn = (props) => {
  const classes = useStyles();
  const [isRequired, setIsRequired] = useState(false);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleValueChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleClearField = () => {
    setIsRequired(false);
    setCredential({
      email: "",
      password: "",
    });
  };

  const handleOnLoginClick = (e) => {
    e.preventDefault();
    if (credential.email && credential.password) {
      props.signIn(credential);
    } else {
      setIsRequired(true);
      return;
    }
  };

  if (props.fbAuth.uid) return <Redirect to="/" />;

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.text}>
        Login
      </Typography>
      {props.authError ? (
        <div className={classes.errMsg}>{props.authError}</div>
      ) : null}
      <form onSubmit={handleOnLoginClick} className={classes.form}>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={credential.email}
          onChange={handleValueChange}
          required={true}
          error={isRequired && !credential.email}
        />
        <br />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={credential.password}
          onChange={handleValueChange}
          required={true}
          error={isRequired && !credential.password}
        />
        <br />
        <br />
        <PrimaryButton text="Login" onClick={handleOnLoginClick} />
        <SecondaryButton text="Clear" onClick={handleClearField} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    fbAuth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credential) => dispatch(signIn(credential)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
