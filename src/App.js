import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import firebase, { fbConfig } from "./config/fbConfig";
import { makeStyles } from "@material-ui/core/styles";

import NavBar from "./components/NavBar";
import Dashboard from "./screens/Dashboard";

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig, firebase)
  )
);

const rrfConfig = { userProfile: "users" };

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const useStyles = makeStyles({
  appContainer: {
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <div className={classes.appContainer}>
            <NavBar />
            <Dashboard />
          </div>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
