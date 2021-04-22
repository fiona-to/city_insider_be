import { combineReducers } from "redux";
import CategoryReducer from "./categoryReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const RootReducer = combineReducers({
  category: CategoryReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default RootReducer;
