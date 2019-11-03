import React, { Component } from 'react';
import { CardConsumer } from '../providers/CardProvider'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import labels from "../helpers/defaultLabels";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const classes = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
};
class PatientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.card,
      isDoctor: this.props.isDoctor,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      var card = { ...prevState.card };
      card[event.target.id] = event.target.value;
      return { card };
    }
    )
  }

  handleSubmit = event => {
    event.preventDefault();
    const axios = require('axios');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post('/card', this.state.card, config,  { withCredentials: true })
      .then((response) => {
        this.props.updateCard({
          card: this.state.card
        });
        console.log(response);
        alert(response.data)
      })
      .catch(function (error) {
        console.log(error);
        alert("Dane nie zostały zapisane ze względu na błędny/już istniejący email")
      })
  }

  prepareFields(card, isDoctor) {
    return (Object.keys(card).map(key => {
      if (!(Array.isArray(card[key]) || key === "userId" || key === "_id")) {
        if (key === "dateBirth") {
          return <Grid key={key} item xs={6} sm={6}><TextField
            key={key}
            required
            disabled={isDoctor}
            id={key}
            label={labels[key]}
            type="date"
            margin="normal"
            fullWidth
            variant="filled"
            defaultValue={card[key]}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange}
          />
          </Grid>
        } else if (key === "address") {
          return <Grid key={key} item xs={6} sm={6}><TextField
            key={key}
            id={key}
            required
            fullWidth
            disabled={isDoctor}
            name={key}
            label={labels[key]}
            value={card[key]}
            onChange={this.handleChange}
            margin="normal"
            variant="filled"
          />
          </Grid>
        } else {
          return <Grid key={key} item xs={6} sm={6}> <TextField
            required
            fullWidth
            id={key}
            disabled={isDoctor}
            label={labels[key]}
            defaultValue={card[key]}
            onChange={this.handleChange}
            margin="normal"
            variant="filled" />
          </Grid>
        }
      } else {
        return null
      }
    })
    )
  }

  render() {
    return (
      <React.Fragment>
        <Paper elevation={1} square >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h4" gutterBottom>
              Dane pacjenta
            </Typography>
          </Grid>
          <form className={classes.container} onSubmit={this.handleSubmit}>
            <Grid
              container
              justify="space-around"
              spacing={2}
            >
              {this.prepareFields(this.state.card, this.state.isDoctor)}
            </Grid>
            {!this.state.isDoctor ? 
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Button
                type="submit"
                id="button"
                color="primary"
                variant="contained"
              >Zapisz
          </Button>
            </Grid>
            : null}
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}


const ConnectedPatientDetails = props => (
  <CardConsumer>
    {({ card, updateCard, isDoctor }) => (
      <PatientDetails
        {...props}
        card={card}
        updateCard={updateCard}
        isDoctor={isDoctor}
      />
    )}
  </CardConsumer>
)

export {ConnectedPatientDetails, PatientDetails}