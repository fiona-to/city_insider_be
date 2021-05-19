export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_ERROR = "SIGNOUT_ERROR";

// Login
export const signIn = (credential) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then((user) => {
        dispatch({
          type: SIGNIN_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGNIN_ERROR,
          payload: error.message,
        });
      });
  };
};

// Logout
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: SIGNOUT_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGNOUT_ERROR,
          payload: error.message,
        });
      });
  };
};
