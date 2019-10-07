import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import CardDetails from './components/card/CardDetails';
import CardUpdate from './components/card/CardUpdate';
import CardProvider from './components/providers/CardProvider';
import Home from './components/Home';
import Login from './components/helpers/Login';
import ProtectedRoute from './components/helpers/ProtectedRoute';

function App() {
  return (
    <CookiesProvider>
      <CardProvider>
        <Router>
          <NavigationBar />
          <Switch>
            <ProtectedRoute
              exact
              path="/main"
              render={() => <Home />}/>
            <ProtectedRoute
              exact
              path="/appointments"
              render={() => <div>Wizyty</div>}
            />
            <ProtectedRoute
              exact
              path="/profile"
              render={() => <CardDetails />}
            />
            <ProtectedRoute
              exact
              path="/profile-update"
              render={() => <CardUpdate />}
            />
            <Route
              exact
              path="/"
              render={() => <Login/>} // redirect to /main i pobranie usera(czyli roli)
            />
          </Switch>
        </Router>
      </CardProvider>
    </CookiesProvider>
  );
}

export default App;
