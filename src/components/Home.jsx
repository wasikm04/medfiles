import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { CardConsumer } from './providers/CardProvider'
class Home extends Component {

  state = {
    username: this.props.user,
    isAuthenticated: this.props.isAuthenticated,
    card: '',
    doctorCard: this.props.doctorCard
  };
  componentDidMount() {
     //console.log(this.props.card);
    // console.log("przed requestami");
    const axios = require('axios');
    
    axios.get('/card/' + this.state.username + '/', { withCredentials: true })
      .then(function (response) {
        console.log(response);
        this.setState({ card: response })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      if (this.state.isDoctor) {
        axios.get('/doctor-card/' + this.state.card.data._user_id , { withCredentials: true })
          .then(function (response) {
            console.log(response);
            this.props.updateCard({ doctorCard: response })
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
      this.props.updateCard({ card: this.state.card});
      //console.log("po requestami");
     // console.log(this.props.card);
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