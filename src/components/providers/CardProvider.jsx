import React, { Component } from 'react'

export const CardContext = React.createContext();

export const CardConsumer = CardContext.Consumer

class CardProvider extends Component {
  state = {
    card: {
      "_id": "",
      "_user_mail": "",
      "_user_id": "",
      "first_name": "",
      "last_name": "",
      "dateBirth": "",
      "sex": "m",
      "address": "",
      "phoneNumber": "",
      "insuranceType": "",
      "prescriptions": [],
      "medicalTests": [],
      "referrals": [],
      "treatments": [],
      "pesel": ""
    },
    isAuthenticated: false,
    isDoctor: false, 
    doctorCard:{},
    user: "",
    updateCard: updatedCard => this.updateCard(updatedCard)
  }

updateCard = updatedCard => {
  this.setState(prevState => ({
    ...prevState,
    ...updatedCard
  }))
}

render() {
  return (
    <CardContext.Provider value={this.state}>
      {this.props.children}
    </CardContext.Provider>
  )
}
}
export default CardProvider