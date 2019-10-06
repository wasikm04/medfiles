import React, {Component} from 'react'
import { CardConsumer } from './providers/CardProvider'

class AccountUpdate extends Component {
    state = {
        mail: this.props.mail,
        firstname: this.props.firstname,
        lastname: this.props.lastname
      }

      handleOnChange = ({ target: { value, name }}) => {
        this.setState({
         [name]: value
        })
      }

      handleOnSubmit = event => {
        event.preventDefault() 
        const updatedAccount = { ...this.state } 
        this.props.updateAccount(updatedAccount)
      }

      render () {
        const { firstname, lastname, mail } = this.state
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="firstname">Imię</label>
              <div>
                <input 
                  type="text" 
                  name="firstname" 
                  value={firstname} 
                  onChange={this.handleOnChange} 
                />
              </div>
              <label htmlFor="lastname">Nazwisko</label>
              <div>
                <input
                type="text" 
                  value={lastname} 
                  name="lastname"
                  onChange={this.handleOnChange}
                />
              </div>
              <label htmlFor="mail">Mail</label>
              <div>
                <input
                type="text" 
                  value={mail} 
                  name="mail"
                  onChange={this.handleOnChange}
                />
              </div>
              <input type="submit" value="Zapisz" />
            </form>
          </div>
        )
      }
}


const ConnectedAccountUpdate = props => (
    <CardConsumer>
      {({  firstname, lastname, mail, id, updateCard }) => (
        <AccountUpdate
          {...props}
          firstname={firstname}
          lastname={lastname}
          mail={mail}
          id={id}
          updateCard={updateCard}
        />
      )}
    </CardConsumer>
  )

export default ConnectedAccountUpdate