import React, { Component } from 'react';
import { CardConsumer } from '../providers/CardProvider'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import labels from "../helpers/defaultLabels";
class PatientDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card: this.props.card,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    //if not empty
  }

  handleChange = event => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        [event.target.id]: event.target.value
      }
    }));
  }

  handleSubmit = event => {
    event.preventDefault();
    const axios = require('axios');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post('/card', this.state.card, config)
      .then((response) => {
        this.props.updateCard({
          card: this.state.card
        });
        alert(response);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      })

  }

  prepareFields(card) {
    return (Object.keys(card).map(key => {
      if (!(Array.isArray(card[key]) || key === "userId" || key === "_id")) {
        return <TextField
          required
          id={key}
          label="Required"
          defaultValue={card[key]}
          //className={classes.textField}
          margin="normal"
          variant="outlined" />
      } else{
       return null
      }
    })
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.prepareFields(this.state.card)}
          <Button
            disabled={!this.validateForm()}
            type="submit"
            //fullWidth
            color="primary"
            variant="contained"
          >Zapisz</Button>
        </form>
      </div>
    );
  }
}


const ConnectedPatientDetails = props => (
  <CardConsumer>
    {({ card, updateCard }) => (
      <PatientDetails
        {...props}
        card={card}
        updateCard={updateCard}
      />
    )}
  </CardConsumer>
)

export default ConnectedPatientDetails