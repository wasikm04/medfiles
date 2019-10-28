import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie';
import './styles/App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import PermanentDrawerLeft from './components/NavBar';
import CardDetails from './components/card/CardDetails';
import CardUpdate from './components/card/CardUpdate';
import DoctorCard from './components/card/DoctorCard';
import CardProvider from './components/providers/CardProvider';
import Home from './components/Home';
import Login from './components/helpers/Login';
import ProtectedRoute from './components/helpers/ProtectedRoute';
import Grid from '@material-ui/core/Grid';
import Logout from './components/helpers/Logout';
import Appointment from './components/models/appointment/Appointment';
import Register from './components/helpers/Register';
import Welcome from './components/helpers/Welcome';

const drawerWidth = 240;

const useStyles = {
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    marginTop: 25,
    background: 'rgb(249, 249, 252)'
  }
};

class App extends Component {
  render() {
    return (
      //<CookiesProvider>
      <CardProvider>
        <BrowserRouter>
          <PermanentDrawerLeft />
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={useStyles.appBar}
          >
            <Switch>
              <ProtectedRoute
                exact
                path="/home"
                component={() => <Home />}
              />
              <ProtectedRoute
                exact
                path="/appointments"
                component={() => <Appointment />}
              />
              <ProtectedRoute
                exact
                path="/doctor-card"
                component={() => <DoctorCard />}
              />
              <ProtectedRoute
                exact
                path="/card"
                component={() => <CardDetails />}
              />
              <ProtectedRoute
                exact
                path="/card/update"
                component={() => <CardUpdate />}
              />
              <ProtectedRoute
                exact
                path="/logout"
                component={() => <Logout cookies={this.props.cookies}/>}
              />
              <Route
                exact
                path="/"
                component={() => <Welcome/>} 
                />
              <Route
                exact
                path="/login"
                render={() => <Login cookies={this.props.cookies} />}
              />
              <Route
                exact
                path="/register"
                component={() => <Register />}
              />
            </Switch>
          </Grid>
        </BrowserRouter>
      </CardProvider>
      // </CookiesProvider>
    );
  }
}

export default withCookies(App);
