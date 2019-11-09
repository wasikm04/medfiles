import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { CardConsumer } from './providers/CardProvider'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      isAuthenticated: this.props.isAuthenticated,
      isDoctor: this.props.isDoctor
    };
  }

  getCard() {
    const axios = require('axios');
    axios.get('/card/' + this.state.username + '/', { withCredentials: true })
      .then( (response)  =>{
        console.log(response.data);
        this.props.updateCard({ card: response.data })
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      })
  }

  getDoctorCard() {
    const axios = require('axios');
    axios.get('/doctor-card/' + this.state.username +'/' , { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        this.props.updateCard({ doctorCard: response.data })
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      })
  }

  componentDidMount() {
    if (this.state.isDoctor) {
      if(this.props.doctorCard == null || this.props.doctorCard.doctorMail !== this.state.username){
        this.getDoctorCard()
      }
    } else {
      //if(this.props.card == null){
        this.getCard()
     // }
    }
  }

  render() {
    return (
      <div>
        <h2>Witaj {this.state.username}!</h2>
      </div>
    );
  }
}
const ConnectedHome = props => (
  <CardConsumer>
    {({ isAuthenticated,updateCard,card, doctorCard , user, isDoctor  }) => (
      <Home
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
        isDoctor={isDoctor}
        updateCard={updateCard}
        card={card}
        doctorCard={doctorCard}
      />
    )}
  </CardConsumer>
)

export default withCookies(ConnectedHome);