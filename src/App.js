import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";
import RootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import firebase, { fbConfig } from "./config/fbConfig";
import { makeStyles } from "@material-ui/core/styles";

import NavBar from "./components/NavBar";
import Dashboard from "./screens/Dashboard";
import CustomizedProgressBars from "./components/SplashLoading";

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig, firebase)
  )
);

const rrfConfig = { userProfile: "user", useFirestoreForProfile: true };

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

const AuthIsLoaded = ({ children }) => {
  const fbAuth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(fbAuth)) return <CustomizedProgressBars />;
  return children;
};

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <AuthIsLoaded>
            <div className={classes.appContainer}>
              <NavBar />
              <Dashboard />
            </div>
          </AuthIsLoaded>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
