import React from 'react';
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
import Home from './components/Home'

function App() {
  return (
    <CookiesProvider>
      <CardProvider>
        <Router>
          <NavigationBar />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home />}/>
            <Route
              exact
              path="/appointments"
              render={() => <div>Wizyty</div>}
            />
            <Route
              exact
              path="/profile"
              render={() => <CardDetails />}
            />
            <Route
              exact
              path="/profile-update"
              render={() => <CardUpdate />}
            />
          </Switch>
        </Router>
      </CardProvider>
    </CookiesProvider>
  );
}

export default App;
