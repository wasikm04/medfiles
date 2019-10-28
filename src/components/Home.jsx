import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { CardConsumer } from './providers/CardProvider'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      isAuthenticated: this.props.isAuthenticated,
      card: {},
      doctorCard: this.props.doctorCard
    };
  }

  getCard() {
    const axios = require('axios');
    axios.get('/card/' + this.state.username + '/', { withCredentials: true })
      .then(response => response.json())
      .then(function (response) {
        this.setState({ card: response })
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      })
  }

  getDoctorCard() {
    const axios = require('axios');
    axios.get('/doctor-card/' + this.state.card.data._user_id, { withCredentials: true })
      .then(response => response.json())
      .then(function (response) {
        this.props.updateCard({ doctorCard: response })
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      })
  }
  componentDidMount() {
    if (this.state.isDoctor) {
      this.getDoctorCard()
    } else {
      this.getCard()
    }
    this.props.updateCard({ card: this.state.card });
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
    {({ isAuthenticated, user, doctorCard, isDoctor, updateCard }) => (
      <Home
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
        doctorCard={doctorCard}
        isDoctor={isDoctor}
        updateCard={updateCard}
      />
    )}
  </CardConsumer>
)

export default withCookies(ConnectedHome);