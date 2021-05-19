import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import CategoryReducer from "./categoryReducer";
import AuthReducer from "./authReducer";

const RootReducer = combineReducers({
  category: CategoryReducer,
  auth: AuthReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default RootReducer;
