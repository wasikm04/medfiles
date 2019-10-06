import React from 'react'
import { Link } from 'react-router-dom'
const NavigationBar = ({ username }) => (
  <div>
    <Link to="/">Strona główna</Link>
    <Link to="/profile">Karta pacjenta</Link>
    <Link to="/appointments">Wizyty</Link>
  </div>
)
export default NavigationBar