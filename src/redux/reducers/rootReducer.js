import { combineReducers } from "redux";
import CategoryReducer from "./categoryReducer";

const RootReducer = combineReducers({
  category: CategoryReducer,
});

export default RootReducer;
