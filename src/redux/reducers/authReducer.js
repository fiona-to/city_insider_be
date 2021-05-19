import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
} from "../actions/authAction";

const initialState = {
  authError: null,
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNIN_SUCCESS:
      return { ...state, authError: null };
    case SIGNIN_ERROR:
      return { ...state, authError: payload };
    case SIGNOUT_SUCCESS:
      return { ...state, authError: null };
    case SIGNOUT_ERROR:
      return { ...state, authError: payload };
    default:
      return state;
  }
};

export default AuthReducer;
