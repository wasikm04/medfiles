import React, { Component } from 'react'

const CardContext = React.createContext()

export const CardConsumer = CardContext.Consumer

class CardProvider extends Component {
  state = {
    card: {
      "_id": "5d989a28c2dada016c30fbf0",
      "_user_mail": "userNew@pw.pl",
      "_user_id": "5d989a0fc2dada016c30fbef",
      "first_name": "Jan",
      "last_name": "Kowalski",
      "dateBirth": "2003-04-29",
      "sex": "m",
      "address": "Warszawa 20-400 ul. Pierwsza 12",
      "phoneNumber": "512512512",
      "insuranceType": "1241221",
      "prescriptions": [],
      "medicalTests": [],
      "referrals": [],
      "treatments": [],
      "pesel": "97042907194"
    },
    isDoctor: false, 
    doctorCard:{},
    user: "",
    updateCard: updatedCard => this.updateCard(updatedCard),
    isAuthenticated: false
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