import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import CategoryReducer from "./categoryReducer";
import NodeReducer from "./nodeReducer";

const RootReducer = combineReducers({
  category: CategoryReducer,
  node: NodeReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default RootReducer;
