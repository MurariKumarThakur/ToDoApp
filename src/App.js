import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import "./App.css";
import Login from "./Login";
import Registration from "./Registration";
import { db, auth } from "./firebase";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/'>
            <NavBar user={user} />
          </Route>
        </Switch>
        <Switch>
          <Route path='/login'>
            <Login user={user} />
          </Route>
        </Switch>

        <Switch>
          <Route exect path='/home'>
            {user ? <Home user={user} /> : ""}
          </Route>
        </Switch>

        <Switch>
          <Route path='/registration'>
            <Registration />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
