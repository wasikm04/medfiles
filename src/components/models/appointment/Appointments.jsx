//lista dla pacjent i lekarza ale lekarz może dodawać po isdoctor a pacjent szukać

import React, { Component } from 'react';
import { CardConsumer } from '../providers/CardProvider'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import labels from "../helpers/defaultLabels";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';


class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: '',
      doctors:'',
      isDoctor: this.props.isDoctor
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }







  
  render(){
      return(<div/>)
  }
}






const ConnectedAppointments = props => (
    <CardConsumer>
      {({ isDoctor }) => (
        <Appointments
          {...props}
          isDoctor={isDoctor}
        />
      )}
    </CardConsumer>
  )
  
  export default ConnectedAppointments