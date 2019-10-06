import React from 'react'
import { Link } from 'react-router-dom'
import { CardConsumer } from './providers/CardProvider';

const NavigationBar = () => (
  <CardConsumer>
    {({ isAuthenticated, isDoctor, updateCard }) => (
      <div>
        <Link to="/">Strona główna</Link>
        <Link to="/profile">Karta pacjenta</Link>
        <Link to="/appointments">Wizyty</Link>
        <Link to="/logout">Wyloguj</Link>
        {isDoctor ? 
        <Link to="/doctor-card">Karta lekarza</Link>
        : null }
      </div>
    )}
  </CardConsumer>

  //funkcja do wylogowywania i zmianiająca flage isAuth
)
export default NavigationBar