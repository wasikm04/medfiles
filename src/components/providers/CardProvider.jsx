import React, { Component } from 'react'

export const CardContext = React.createContext();

export const CardConsumer = CardContext.Consumer

class CardProvider extends Component {
  state = {
    card: null,
    isAuthenticated: false,
    isDoctor: false, 
    doctorCard:null,
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