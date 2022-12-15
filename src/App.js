import React, { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ItemPage from "./pages/ItemPage";
import Popular from "./pages/Popular";
import "antd/dist/reset.css";
import Settings from "./pages/Settings";
function App() {
  const Login = () => {};
  return (
    <>
      {/* <Protected.Provider value={{ state, login: Login }}> */}
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/sign" component={Sign} /> */}
          <Route path="/popular" component={Popular} />
          <Route path="/users" component={Products} />
          <Route path="/settings" component={Settings} />
          <Route
            path="/assets/:network/:address/:tokenId"
            component={ItemPage}
          />
        </Switch>
      </Router>
      {/* </Protected.Provider> */}
    </>
  );
}

export default App;
