import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import CoinGamePage from "./components/CoinGamePage";
import DoorGamePage from "./components/DoorGamePage";
import NumberGamePage from "./components/NumberGamePage";
import WinnerPage from "./components/WinnerPage";
import TryAgainPage from "./components/TryAgainPage";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/coin-game" component={CoinGamePage} />
          <Route exact path="/door-game" component={DoorGamePage} />
          <Route exact path="/number-game" component={NumberGamePage} />
          <Route exact path="/winner" component={WinnerPage} />
          <Route exact path="/try-again" component={TryAgainPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
