import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { axios } from 'axios';
import { CardConsumer } from './providers/CardProvider'
class Home extends Component {

  state = {
    username: this.props.user,
    isAuthenticated: this.props.isAuthenticated,
    card: this.props.card,
    doctorCard: this.props.doctorCard
  };

  constructor(props) {
    super(props);
    //const { cookies } = props;
  }

  async componentDidMount() {
    const axios = require('axios');
    if (this.state.isDoctor) {
      axios.get('/doctor-card/' + this.state.username, { withCredentials: true })
        .then(function (response) {
          this.props.updateCard({ doctorCard: response })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    } else {
      axios.get('/card/' + this.state.username +'/', { withCredentials: true })
        .then(function (response) {
          this.props.updateCard({ card: response })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
  }

  render() {
    return (
      <div>
        user:
        {console.log(this.state.card)}
      </div>
    );
  }
}

const ConnectedHome = props => (
  <CardConsumer>
    {({ isAuthenticated, card, user, doctorCard, isDoctor }) => (
      <Home
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
        card={card}
        doctorCard={doctorCard}
        isDoctor={isDoctor}
      />
    )}
  </CardConsumer>
)

export default withCookies(ConnectedHome);