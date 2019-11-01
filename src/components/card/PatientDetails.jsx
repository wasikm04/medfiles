import React from 'react';
import { Link } from 'react-router-dom';
import { CardConsumer } from '../providers/CardProvider';

const PatientDetails = () => (
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
)
export default PatientDetails