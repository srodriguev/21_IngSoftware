import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';


import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
import { Board } from "./components/Board";
import { HomePage } from "./components/HomePage";
import { Polls } from "./components/Polls";
import { Registers } from "./components/Registers";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/About" component={About} />
          <Route exact path="/Users" component={Users} />
          <Route exact path="/Board" component={Board} />
          <Route exact path="/Polls" component={Polls} />
          <Route exact path="/Registers" component={Registers} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
