import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import AuthGard from "./components/AuthGard";
import Layout from "./components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Setup from "./pages/Setup";

const App: Component = () => {
  return (
    <Router root={Layout}>
      <Route path="/login" component={Login} />
      <Route path="/setup" component={Setup} />
      <Route path="/" component={AuthGard}>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  );
};

export default App;
