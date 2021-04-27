import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
import { Board } from "./components/Board";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container p-4">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/Users" component={Users} />
          <Route path="/board" component={Board} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
