import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./redux/reducers/rootReducer";

import NavBar from "./components/NavBar";
import Dashboard from "./screens/Dashboard";

const store = createStore(RootReducer);

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
