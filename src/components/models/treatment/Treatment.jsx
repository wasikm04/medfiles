import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Information from "./Information.jsx"
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import { Button } from '@material-ui/core';


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
            pharmacotherapy: [],
            medicalAnalysis: [],
        };
        this.saveTreatment = this.saveTreatment.bind(this);
        this.pushToParametersList = this.pushToParametersList.bind(this);
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

    pushToParametersList = (event, listName) => {
        event.preventDefault();
        event.persist()
        const newInformation = {
            date: event.target[0].value,
            information: event.target[1].value,
            doctorMail: this.state.doctorMail
        }
        var updateList = this.state.treatment[listName];
        updateList = [...updateList, newInformation];
        console.log(updateList)
        this.setState(prevState => ({
            treatment: {...prevState.treatment, [listName]:updateList}
        }))
        console.log(this.state.treatment)
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
        var tempDate = new Date();
        return (
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
                        <Tab label="Symptomy i diagnoza" />
                        <Tab label="Farmakoterapia" />
                        <Tab label="Analiza medyczna i zalecenia" />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.selected} index={0}>
                    {this.state.treatment.symptomsAndDiagnosis.map((info) =>
                        <Information key={tempDate.toISOString() + info._id} information={info} />
                    )}
                    <Information handleChange={(event) => this.pushToParametersList(event, "symptomsAndDiagnosis")} isDoctor={this.state.isDoctor} />
                </TabPanel>
                <TabPanel value={this.state.selected} index={1}>
                    {this.state.treatment.pharmacotherapy.map((info) =>
                        <Information key={tempDate.toISOString() + info._id} information={info} />
                    )}
                    <Information handleChange={(event) => this.pushToParametersList(event, "pharmacotherapy")} isDoctor={this.state.isDoctor} />
                </TabPanel>
                <TabPanel value={this.state.selected} index={2}>
                    {this.state.treatment.medicalAnalysisAndRecommendations.map((info) =>
                        <Information key={tempDate.toISOString() + info._id} information={info} />
                    )}
                    <Information handleChange={(event) => this.pushToParametersList(event, "medicalAnalysisAndRecommendations")} isDoctor={this.state.isDoctor} />
                </TabPanel>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Button
                        onClick={e => this.saveTreatment(e)}
                        id="button"
                        color="primary"
                        variant="contained"
                    >
                        Zapisz historie
                    </Button>
                </Grid>
            </Grid>
        ) //TODO: PANELE INFORMATION z dodawaniem pojedynczych obiektów i zapisem do bazy
    }
}