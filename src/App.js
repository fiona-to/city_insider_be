import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import RootReducer from "./redux/reducers/rootReducer";

import NavBar from "./components/NavBar";
import Dashboard from "./screens/Dashboard";

const store = createStore(RootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Dashboard />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
