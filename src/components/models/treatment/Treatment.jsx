import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Information from "./Information.jsx"
import Typography from '@material-ui/core/Typography';
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
export default class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatment: this.props.treatment,
            patientMail: this.props.user,
            isDoctor: this.props.isDoctor,
            selected: 0,
            symptoms: [],
            symptom: null,
            pharmacotherapy: [],
            pharmaco: null,
            medicalAnalysis: [],
            medAnalys: null,
        };
        //this.saveTreatment = this.saveTreatment.bind(this);
        this.pushToParametersList = this.pushToParametersList.bind(this);
        this.handleParameterChange = this.handleParameterChange.bind(this);
    }

    handleTab = (event, newValue) => {
        this.setState({ selected: newValue });
    };

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var treatment = { ...prevState.treatment };
            treatment[event.target.id] = event.target.value;
            return { treatment };
        })
    }

    saveTreatment = (event) => {
        event.preventDefault();
        const completedTreatment = { ...this.state.treatment, userMail: this.state.patientMail }
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put('/treatment', completedTreatment, config, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Pomyślnie zapisano kartę")
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały zapisane ze względu na błędny/już istniejący email")
            })
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h4" gutterBottom>
                    Historia choroby {this.state.treatment.numberICD}
                </Typography>
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
                        <Tab label="Symptomy i diagnoza" />
                        <Tab label="Farmakoterapia" />
                        <Tab label="Analiza medyczna i zalecenia" />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.selected} index={0}>
                    {this.state.treatment.symptomsAndDiagnosis.map((info) =>
                    <Information key={info.date} information={info} />
                    )}
                </TabPanel>
                <TabPanel value={this.state.selected} index={1}>
                {this.state.treatment.pharmacotherapy.map((info) =>
                    <Information key={info.date} information={info} />
                    )}
                </TabPanel>
                <TabPanel value={this.state.selected} index={2}>
                {this.state.treatment.medicalAnalysisAndRecommendations.map((info) =>
                    <Information key={info.date} information={info} />
                    )}
                </TabPanel>
            </Grid>
        ) //TODO: PANELE INFORMATION z dodawaniem pojedynczych obiektów i zapisem do bazy
    }
}