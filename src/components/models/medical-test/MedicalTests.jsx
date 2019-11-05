import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import MedicalTest from './MedicalTest.jsx'
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class MedicalTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicalTests: this.props.card.medicalTests,
            isDoctor: this.props.isDoctor,
            doctorMail: this.props.user,
            patientMail: this.props.card.userMail,
            parametersList: [],
            parameter: null
        };
        this.addMedicalTest = this.addMedicalTest.bind(this);
        this.pushToParametersList = this.pushToParametersList.bind(this);
        this.handleParameterChange = this.handleParameterChange.bind(this);
    }

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var medicalTests = { ...prevState.medicalTests };
            medicalTests[event.target.id] = event.target.value;
            return { medicalTests };
        }
        )
    }

    handleParameterChange(event) {
        this.setState({
            parameter: event.target.value
        });
    }

    pushToParametersList = (event) => {
        event.persist()
        this.setState(prevState => ({
            parametersList: [...prevState.parametersList, this.state.parameter]
        }))
    }


    addMedicalTest = (event) => {
        event.preventDefault();
        const newelement = {
            _id: null,
            userMail: this.state.patientMail,
            testDate: event.target[1].value,
            testName: event.target[0].value,
            authorMail: this.state.doctorMail,
            parametersWithReference: this.state.parametersList,
            fileId: null
        }
        console.log(newelement)

        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/medical-test', newelement, config, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Pomyślnie zapisano kartę")
                this.setState(prevState => ({
                    medicalTests: [...prevState.medicalTests, newelement]
                }))
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały zapisane ze względu na błędne dane")
            })
    }

    prepareForms(medicalTests, isDoctor) {
        return (
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                {medicalTests.map((test) =>
                    <Grid key={test.testDate + test._id} item>
                        <Paper elevation={3} square={false} >
                            <Typography variant="h4" gutterBottom>
                                Badanie {test.testDate}
                            </Typography>
                            <MedicalTest medicalTest={test} isDoctor={isDoctor} user={this.state.patientMail} />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        )
    }


    render() {
        return (
            <React.Fragment>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="h4" gutterBottom>
                        Wyniki badań
                    </Typography>
                </Grid>
                {this.prepareForms(this.state.medicalTests, this.state.isDoctor, this.state.patientMail)}
                {this.state.isDoctor ?
                    <Paper elevation={1} square>
                        <form onSubmit={this.addMedicalTest}>
                            <Grid
                                container
                                //direction="column"
                                justify="center"
                               // alignItems="center"
                            >
                                <Typography variant="h4" gutterBottom>
                                    Nowe wyniki
                                </Typography>
                                <TextField
                                    fullWidth
                                    required
                                    id='purpose'
                                    label="Nazwa badania"
                                    margin="normal"
                                    variant="filled"
                                    name="testName" />
                                    <TextField
                                    required
                                    id="date"
                                    label="Data"
                                    type="date"
                                    margin="normal"
                                    fullWidth
                                    variant="filled"
                                    name="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center">
                                    <div>
                                        <TableCell align="right">{this.state.parametersList.map(param =>
                                            (<ListItem key={param} button>
                                                <ListItemText primary={param} />
                                            </ListItem>))}
                                        </TableCell>
                                    </div>
                                    <TextField
                                        fullWidth
                                        required
                                        id='purpose'
                                        label="Parametr z odniesieniem"
                                        margin="normal"
                                        variant="filled"
                                        onChange={this.handleParameterChange}
                                        name="testName" />
                                    <Grid item>
                                        <Button
                                            onClick={(e) => this.pushToParametersList(e)}
                                            id="button"
                                            color="primary"
                                            variant="contained"
                                        >Dodaj parametr
                                     </Button>
                                    </Grid>
                                </Grid>
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
                                        Zapisz wyniki
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                    : null}

            </React.Fragment >
        );
    }
}

const ConnectedMedicalTests = props => (
    <CardConsumer>
        {({ user, card, isDoctor, updateCard }) => (
            <MedicalTests
                {...props}
                card={card}
                user={user}
                updateCard={updateCard}
                isDoctor={isDoctor}
            />
        )}
    </CardConsumer>
)

export { ConnectedMedicalTests, MedicalTests }