import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Treatment from './Treatment.jsx'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
//import TabPanel from "../../card/PatientCard"
import Information from "./Information.jsx"
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
class Treatments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatments: this.props.card.treatments,
            isDoctor: this.props.isDoctor,
            doctorMail: this.props.user,
            patientMail: this.props.card.userMail,
            symptoms: [],
            pharmacotherapy: [],
            medicalAnalysis: [],
            selected: 0,
            expanded:""
        };
        this.addTreatment = this.addTreatment.bind(this);
        this.pushToParametersList = this.pushToParametersList.bind(this);
    }

    handleChangePanel = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

    handleTab = (event, newValue) => {
        this.setState({ selected: newValue });
    };

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var treatments = { ...prevState.treatments };
            treatments[event.target.id] = event.target.value;
            return { treatments };
        }
        )
    }

    pushToParametersList = (event, listName) => {
        event.preventDefault();
        event.persist()
        const newInformation = {
            date: event.target[0].value,
            information: event.target[1].value,
            doctorMail: this.state.doctorMail
        }
        this.setState(prevState => ({
            [listName]: [...prevState[listName], newInformation]
        }))
    }


    addTreatment = (event) => {
        console.log(event)
        event.preventDefault();
        const newelement = {
            _id: null,
            userMail: this.state.patientMail,
            numberICD: event.target[0].value,
            symptomsAndDiagnosis: this.state.symptoms,
            pharmacotherapy: this.state.pharmacotherapy,
            medicalAnalysisAndRecommendations: this.state.medicalAnalysis
        }
        console.log(newelement)
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/treatment', newelement, config, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Pomyślnie zapisano kartę")
                this.setState(prevState => ({
                    treatments: [...prevState.treatments, newelement]
                }))
            })
            .catch(function (error) {
                console.log(error);
                console.log(newelement)
                alert("Dane nie zostały zapisane ze względu na błędne dane")
            })
    }

    prepareForms(treatments, isDoctor) {
        return (
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                {treatments.map((test) =>
                    <Grid key={test.numberICD + test._id} item>
                        <Paper elevation={3} square={false} >
                            <ExpansionPanel expanded={this.state.expanded === test.numberICD + test._id} onChange={this.handleChangePanel(test.numberICD + test._id)}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography variant="h4" gutterBottom>
                                        Historia choroby {test.numberICD}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Treatment treatment={test} isDoctor={isDoctor} doctorMail={this.state.doctorMail} user={this.state.patientMail}/>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        )
    }


    render() {
        var tempDate = new Date();
        return (
            <React.Fragment>
                {this.prepareForms(this.state.treatments, this.state.isDoctor, this.state.patientMail)}
                {this.state.isDoctor ?
                    <Paper elevation={1} square>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="h4" gutterBottom>
                                Nowa historia choroby
                            </Typography>
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
                                {this.state.symptoms != null ? this.state.symptoms.map((info) =>
                                    <Information key={tempDate.toISOString()} information={info} />
                                ) : null}
                                <Information handleChange={(event) => this.pushToParametersList(event, "symptoms")} isDoctor={this.state.isDoctor} />
                            </TabPanel>
                            <TabPanel value={this.state.selected} index={1}>
                                {this.state.pharmacotherapy != null ? this.state.pharmacotherapy.map((info) =>
                                    <Information key={tempDate.toISOString()} information={info} />
                                ) : null}
                                <Information handleChange={(event) => this.pushToParametersList(event, "pharmacotherapy")} isDoctor={this.state.isDoctor} />
                            </TabPanel>
                            <TabPanel value={this.state.selected} index={2}>
                                {this.state.medicalAnalysis != null ? this.state.medicalAnalysis.map((info) =>
                                    <Information key={tempDate.toISOString()} information={info} />
                                ) : null}
                                <Information handleChange={(event) => this.pushToParametersList(event, "medicalAnalysis")} isDoctor={this.state.isDoctor} />
                            </TabPanel>
                            <form onSubmit={this.addTreatment}>
                                <Grid
                                    container
                                    justify="center"
                                >
                                    <TextField
                                        fullWidth
                                        required
                                        id='icd'
                                        label="Numer ICD"
                                        margin="normal"
                                        variant="filled"
                                        name="testName" />
                                    <Grid container
                                        direction="row"
                                        justify="center"
                                        alignItems="center">
                                        <Button
                                            type="submit"
                                            id="button"
                                            color="primary"
                                            variant="contained"
                                        >
                                            Zapisz nową historie
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Paper>
                    : null}
            </React.Fragment >
        );
    }
}

const ConnectedTreatments = props => (
    <CardConsumer>
        {({ user, card, isDoctor, updateCard }) => (
            <Treatments
                {...props}
                card={card}
                user={user}
                updateCard={updateCard}
                isDoctor={isDoctor}
            />
        )}
    </CardConsumer>
)

export { ConnectedTreatments, Treatments }