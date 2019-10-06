import React, { Component } from 'react'

const CardContext = React.createContext()

export const CardConsumer = CardContext.Consumer

class CardProvider extends Component {
  state = {
    firstname:"Jan",
    lastname:"Kowalski",
    mail:"admin@pw.pl",
    id:123,
    updateCard: updatedCard => this.updateCard(updatedCard)
  }

  updateCard = updatedCard => {
    this.setState(prevState => ({
      ...prevState,
      ...updatedCard
    }))
  }

  render () {
    return (
       <CardContext.Provider value={this.state}>
        {this.props.children}
      </CardContext.Provider>
    )
  }
}
export default CardProvider