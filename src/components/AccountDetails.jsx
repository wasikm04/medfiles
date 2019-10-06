import React from 'react';
import { Link } from 'react-router-dom';
import { CardConsumer } from './providers/CardProvider';

const AccountDetails = () => (
<CardConsumer>
{({ firstname, lastname, mail, id}) => (
  <div>
  <div>
    <p>Imię: {firstname}</p>
    <p>Nazwisko: {lastname}</p>
    <p>mail: {mail}</p>
    <p>id: {id}</p>
  </div>
  <Link to="/profile-update">Aktualizacja karty</Link>
  </div>
)}
  </CardConsumer>
)
export default AccountDetails