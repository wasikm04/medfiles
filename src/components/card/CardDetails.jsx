import React from 'react';
import { Link } from 'react-router-dom';
import { CardConsumer } from '../providers/CardProvider';

const CardDetails = () => (
  <CardConsumer>
    {({ card}) => (
          <div>
            <div>
              <p>Karta: {card}</p>
            </div>
            <Link to="/profile-update">Aktualizacja karty</Link>
          </div>
    )}
  </CardConsumer>
) //cos tu nie tak bo strzela do bazy
export default CardDetails