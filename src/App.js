import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import './styles/App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import CardDetails from './components/card/CardDetails';
import CardUpdate from './components/card/CardUpdate';
import CardProvider from './components/providers/CardProvider';
import CardConsumer from './components/providers/CardProvider';
import Home from './components/Home';
import Login from './components/helpers/Login';
import ProtectedRoute from './components/helpers/ProtectedRoute';

function App() {
  return (
    <CookiesProvider>
      <CardProvider>
        <BrowserRouter>
          <NavigationBar />
          <Switch>
            <ProtectedRoute
              exact
              path="/home"
              component={() => <Home />}
            />
            <ProtectedRoute
              exact
              path="/appointments"
              component={() => <div>Wizyty</div>}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={() => <CardDetails />}
            />
            <ProtectedRoute
              exact
              path="/profile-update"
              component={() => <CardUpdate />}
            />
            <Route
              exact
              path="/"
              render={() => <Login />} // redirect to /main i pobranie usera(czyli roli)
            />
          </Switch>
        </BrowserRouter>
      </CardProvider>
    </CookiesProvider>
  );
}

export default App;
