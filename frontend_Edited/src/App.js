import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home.js";
import VolunteerLogin from "./Pages/VolunteerLogin.js";
import AdminLogin from "./Pages/AdminLogin.js";
import { NavLink } from 'react-router-dom';
import "./css/Navbar.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerClassName: "HomeHeader"
    }
  }

  changeHeaderStyle = (name) => {
    this.setState({
      headerClassName: name
    })
  }

  navbar = type => {
    return(
      <div className={type}>
        <div className="Header">
          <p><h1>KudumbaPadam</h1><h1><i>{type}</i></h1></p>
          <NavLink className="NavLink" to="/">Home</NavLink>
          <NavLink className="NavLink" to="/volunteer">Volunteers</NavLink>
          <NavLink className="NavLink" to="/admin">Admin</NavLink>
        </div>
      </div>
    );
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" component={() => <Home navbar={this.navbar}/>} exact/>
            <Route path="/volunteer" component={() => <VolunteerLogin navbar={this.navbar} />}/>
            <Route path="/admin" component={() => <AdminLogin navbar={this.navbar} />}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
