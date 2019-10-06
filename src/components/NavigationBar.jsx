import React from 'react'
import { Link } from 'react-router-dom'
import { CardConsumer } from './providers/CardProvider';

const NavigationBar = () => (
  <CardConsumer>
    {({ isAuthenticated }) => (
      <div>
        {isAuthenticated ? 
        <div>
        <Link to="/">Strona główna</Link>
        <Link to="/profile">Karta pacjenta</Link>
        <Link to="/appointments">Wizyty</Link>
        <Link to="/logout">Wyloguj</Link>
        </div>
        : <Link to="/login">Zaloguj</Link>
      }
      </div>
    )}
  </CardConsumer>
)
export default NavigationBar