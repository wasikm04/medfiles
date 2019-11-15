import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { CardConsumer } from '../providers/CardProvider'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import React, { Component } from 'react';
import { Referrals } from "../models/referral/Referrals"
import { MedicalTests } from "../models/medical-test/MedicalTests"
import { Prescriptions } from "../models/prescription/Prescriptions"
import { Treatments } from "../models/treatment/Treatments"
import { PatientDetails } from "./PatientDetails"
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
class PatientCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: null,
      doctorMail: this.props.user,
      isDoctor: this.props.isDoctor,
      selected: 0,
      doctorCard: this.props.doctorCard
    };
  }

  handleTab = (event, newValue) => {
    this.setState({ selected: newValue });
  };

  componentDidMount() {
    const axios = require('axios');
    axios.get('/card/' + this.props.match.params.patientMail, + "/", { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        this.setState({
          card: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
        alert("Dane nie zostały pobrane, spróbuj ponownie")
      })
  }

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography variant="h4" gutterBottom>
            Kartoteka pacjenta
            </Typography>
        </Grid>
        {this.state.card != null ?
          <Paper elevation={1} square >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.selected}
                  onChange={this.handleTab}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  centered
                >
                  <Tab label="Dane osobowe" />
                  <Tab label="Skierowania" />
                  <Tab label="Badania" />
                  <Tab label="Recepty" />
                  <Tab label="Historia chorób" />
                </Tabs>
              </AppBar>
              <TabPanel value={this.state.selected} index={0}>
                <PatientDetails card={this.state.card} isDoctor={this.state.isDoctor} updateCard={this.props.updateCard} />
              </TabPanel>
              <TabPanel value={this.state.selected} index={1}>
                <Referrals card={this.state.card} isDoctor={this.state.isDoctor} updateCard={this.props.updateCard} user={this.state.doctorMail} numberPWZ={this.state.doctorCard.numberPWZ} />
              </TabPanel>
              <TabPanel value={this.state.selected} index={2}>
                <MedicalTests card={this.state.card} isDoctor={this.state.isDoctor} updateCard={this.props.updateCard} user={this.state.doctorMail} />
              </TabPanel>
              <TabPanel value={this.state.selected} index={3}>
                <Prescriptions card={this.state.card} isDoctor={this.state.isDoctor} updateCard={this.props.updateCard} user={this.state.doctorMail} numberPWZ={this.state.doctorCard.numberPWZ} />
              </TabPanel>
              <TabPanel value={this.state.selected} index={4}>
                <Treatments card={this.state.card} isDoctor={this.state.isDoctor} updateCard={this.props.updateCard} user={this.state.doctorMail} />
              </TabPanel>
            </Grid>
          </Paper>
          : <CircularProgress align="center" />}

      </React.Fragment>
    )
  }
}

const ConnectedPatientCard = props => (
  <CardConsumer>
    {({ updateCard, isDoctor, user, doctorCard }) => (
      <PatientCard
        {...props}
        isDoctor={isDoctor}
        user={user}
        updateCard={updateCard}
        doctorCard={doctorCard}
      />
    )}
  </CardConsumer>
)

export default ConnectedPatientCard