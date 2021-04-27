import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

import * as Color from "../_constant/color";

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
}));

// Component
const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChanged = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCancelLogin = () => {
    // Todo
    setUsername("");
    setPassword("");
  };

  const handleOnLoginClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.text}>
        Login
      </Typography>
      <form className={classes.form}>
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={handleUsernameChanged}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnLoginClick}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancelLogin}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default Login;
