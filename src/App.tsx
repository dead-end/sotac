import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import AuthGard from "./components/AuthGard";
import Layout from "./components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { GithubContextProvider } from "./contexts/GithubContext";
import SetupGithub from "./pages/SetupGithub";

const App: Component = () => {
  return (
    <GithubContextProvider>
      <Router root={Layout}>
        <Route path="/" component={AuthGard}>
          <Route path="/login" component={Login} />
          <Route path="/setup" component={SetupGithub} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Route>
      </Router>
    </GithubContextProvider>
  );
};

export default App;
