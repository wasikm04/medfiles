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
            symptom: null,
            pharmacotherapy: [],
            pharmaco: null,
            medicalAnalysis: [],
            medAnalys: null,
            selected: 0
        };
        this.addTreatment = this.addTreatment.bind(this);
        this.pushToParametersList = this.pushToParametersList.bind(this);
        this.handleParameterChange = this.handleParameterChange.bind(this);
    }

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

    handleParameterChange(event, name) {
        console.log(event.target)
        const newInformation = {
            date: event.target[0].value,
            information: event.target[1].value,
            doctorMail: this.state.doctorMail
        }
        this.setState({
            [name]: newInformation
        });
    }

    pushToParametersList = (event, paramName, listName) => {
        console.log(event.target)
        event.persist()
        this.setState(prevState => ({
            [listName]: [...prevState[listName], this.state[paramName]]
        }))
    }


    addTreatment = (event) => {
        console.log(event)
        event.preventDefault();
        const newelement = {
            _id: null,
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
        axios.post('/treatments', newelement, config, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Pomyślnie zapisano kartę")
                this.setState(prevState => ({
                    treatments: [...prevState.treatments, newelement]
                }))
            })
            .catch(function (error) {
                console.log(error);
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
                    <Grid key={test.testDate + test._id} item>
                        <Paper elevation={3} square={false} >
                            <Treatment treatment={test} isDoctor={isDoctor} doctorMail={this.state.doctorMail} />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        )
    }


    render() {
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
                                Nowe historia
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
                                <Information handleChange={(event) => this.handleParameterChange(event, this.state.symptom)} isDoctor={this.state.isDoctor}/>
                                <Button
                                    id="button"
                                    color="primary"
                                    variant="contained"
                                    onClick={(event) => this.pushToParametersList(event, this.state.symptom, this.state.symptoms)}>
                                    Dodaj do listy
                                    </Button>
                            </TabPanel>
                            <TabPanel value={this.state.selected} index={1}>
                                <Information handleChange={(event) => this.handleParameterChange(event, this.state.pharmaco)} isDoctor={this.state.isDoctor} />
                                <Button
                                    id="button"
                                    color="primary"
                                    variant="contained"
                                    onClick={(event) => this.pushToParametersList(event, this.state.pharmaco, this.state.pharmacotherapy)}>
                                    Dodaj do listy
                                    </Button>
                            </TabPanel>
                            <TabPanel value={this.state.selected} index={2}>
                                <Information handleChange={(event) => this.handleParameterChange(event, this.state.medAnalys)} isDoctor={this.state.isDoctor} />
                                <Button
                                    id="button"
                                    color="primary"
                                    variant="contained"
                                    onClick={(event) => this.pushToParametersList(event, this.state.medAnalys, this.state.medicalAnalysis)}>
                                    Dodaj do listy
                                    </Button>
                            </TabPanel>
                            <form onSubmit={this.props.addTreatment}>
                                <Grid
                                    container
                                    //direction="column"
                                    justify="center"
                                //alignItems="center"
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