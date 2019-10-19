import React from 'react'
import { Link } from 'react-router-dom'
import { CardConsumer } from './providers/CardProvider';

const NavigationBar = () => (
  <CardConsumer>
    {({ isAuthenticated, isDoctor, updateCard }) => (
      <div>
        {isAuthenticated ?
          <div>
            <Link to="/home">Strona główna</Link>
            {isDoctor ?
              <Link to="/doctor-card">Karta lekarza</Link> :
              <Link to="/profile">Karta pacjenta</Link>
            }
            <Link to="/appointments">Wizyty</Link>
            <Link to="/logout">Wyloguj</Link>
          </div>
          : null}
      </div>
    )}
  </CardConsumer>
)
export default NavigationBar