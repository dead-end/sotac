/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import AuthGard from "./components/AuthGard";

const root = document.getElementById("root");

render(
  () => (
    <Router root={App}>
      <Route path="/login" component={Login} />
      <Route path="/" component={AuthGard}>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  ),
  root!
);
