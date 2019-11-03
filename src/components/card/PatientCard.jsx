//zbiorczo wszystkie 4  kategorie do przetwarzania karty którą ściągniemy po id w componentdidmount
//<Referrals updateCard=... user=username, card=card ... > referrals lub connectedreferrals
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { CardConsumer } from '../providers/CardProvider'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import React, { Component } from 'react';
import { Referrals } from "../models/referral/Referrals"
import { PatientDetails } from "./PatientDetails"
import Box from "@material-ui/core/Box";

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
    axios.get('/card/' + this.props.match.params.patientMail + "/", { withCredentials: true })
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
        <Paper elevation={1} square >
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
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
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
            </Grid>
            : null}
        </Paper>
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

























/*
<div className={classes.root}>
  <AppBar position="static" color="default">
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      <Tab label="Item One" {...a11yProps(0)} />
      <Tab label="Item Two" {...a11yProps(1)} />
      <Tab label="Item Three" {...a11yProps(2)} />
      <Tab label="Item Four" {...a11yProps(3)} />
      <Tab label="Item Five" {...a11yProps(4)} />
      <Tab label="Item Six" {...a11yProps(5)} />
      <Tab label="Item Seven" {...a11yProps(6)} />
    </Tabs>
  </AppBar>
  <TabPanel value={value} index={0}>
    Item One
</TabPanel>
  <TabPanel value={value} index={1}>
    Item Two
</TabPanel>
  <TabPanel value={value} index={2}>
    Item Three
</TabPanel>
  <TabPanel value={value} index={3}>
    Item Four
</TabPanel>
  <TabPanel value={value} index={4}>
    Item Five
</TabPanel>
  <TabPanel value={value} index={5}>
    Item Six
</TabPanel>
  <TabPanel value={value} index={6}>
    Item Seven
</TabPanel>
</div>*/