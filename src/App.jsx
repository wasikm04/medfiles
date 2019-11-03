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
import PatientDetails from './components/card/PatientDetails';
import DoctorCard from './components/card/DoctorCard';
import CardProvider from './components/providers/CardProvider';
import Home from './components/Home';
import Login from './components/helpers/Login';
import ProtectedRoute from './components/helpers/ProtectedRoute';
import Grid from '@material-ui/core/Grid';
import Logout from './components/helpers/Logout';
import Appointments from './components/models/appointment/Appointments';
import DoctorList from './components/models/DoctorList'
import MedicalTests from './components/models/medical-test/MedicalTests';
import Prescriptions from './components/models/prescription/Prescriptions';
import {ConnectedReferrals} from './components/models/referral/Referrals.jsx';
import Treatments from './components/models/treatment/Treatments';
import Register from './components/helpers/Register';
import Welcome from './components/helpers/Welcome';
import PatientCard from './components/card/PatientCard';
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
            //spacing={2}
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
                component={() => <Appointments />}
              />
              <ProtectedRoute
                exact
                path="/doctor-list"
                component={() => <DoctorList />}
              />
              <ProtectedRoute
                exact
                path="/medical-tests"
                component={() => <MedicalTests />}
              />
              <ProtectedRoute
                exact
                path="/prescriptions"
                component={() => <Prescriptions />}
              />
              <ProtectedRoute
                exact
                path="/referrals"
                component={() => <ConnectedReferrals />}
              />
              <ProtectedRoute
                exact
                path="/treatments"
                component={() => <Treatments />}
              />
              <ProtectedRoute
                
                path="/doctor-card/:doctorMail"  //wyszukiwanie doktora przez pacjentów :props.match.params.doctorMail
                component={DoctorCard}
              />
              <ProtectedRoute
                exact
                path="/card"
                component={() => <PatientDetails />}
              />
              <ProtectedRoute
                exact
                path="/patient-card/:patientMail"        //:patientMail  -> props.match.params.patientMail        // Sprawdzić czy potrzebne
                component={() => <PatientCard />}
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
