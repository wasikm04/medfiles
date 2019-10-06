import React from 'react';
import './styles/App.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import AccountDetails from './components/AccountDetails';
import AccountUpdate from './components/AccountUpdate';
import CardProvider from './components/providers/CardProvider';

function App() {
  return (
    <CardProvider>
    <Router>
      <NavigationBar/>
      <Switch>
        <Route 
          exact 
          path="/" 
          render={() => <div className="App">
                        <header className="App-header">
                          <p>
                            Medical Files frontend app.
                          </p>
                        </header>
                      </div>}
        />
        <Route 
          exact 
          path="/appointments" 
          render={() => <div>Wizyty</div> } 
        />
        <Route 
          exact 
          path="/profile" 
          render={() => <AccountDetails/> } 
        />
        <Route 
          exact 
          path="/profile-update" 
          render={() => <AccountUpdate/> } 
        />
      </Switch>
    </Router>
    </CardProvider>
  );
}

export default App;
