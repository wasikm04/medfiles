import React from 'react';
import { Link } from 'react-router-dom';
import { CardConsumer } from '../providers/CardProvider';

const CardDetails = () => (
  <CardConsumer>
    {({ card}) => (
          <div>
            <div>
              <p>Imię: {card.first_name}</p>
              <p>Nazwisko: {card.last_name}</p>
              <p>mail: {card._user_mail}</p>
              <p>id: {card._id}</p>
            </div>
            <Link to="/profile-update">Aktualizacja karty</Link>
          </div>
    )}
  </CardConsumer>
)
export default CardDetails