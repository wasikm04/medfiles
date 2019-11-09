import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Prescription from './Prescription.jsx'
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Prescriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptions: this.props.card.prescriptions,
            isDoctor: this.props.isDoctor,
            doctorMail: this.props.user,
            numberPWZ: this.props.numberPWZ,
            patientMail: this.props.card.userMail,
            medicinesList: [],
            medicine: null,
            expanded:""
        };
        this.addPrescription = this.addPrescription.bind(this);
        this.pushToMedicinesList = this.pushToMedicinesList.bind(this);
        this.handleMedicineChange = this.handleMedicineChange.bind(this);
    }

    handleChangePanel = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var prescriptions = { ...prevState.prescriptions };
            prescriptions[event.target.id] = event.target.value;
            return { prescriptions };
        }
        )
    }

    handleMedicineChange(event) {
        this.setState({
            medicine: event.target.value
        });
    }

    pushToMedicinesList = (event) => {
        event.persist()
        this.setState(prevState => ({
            medicinesList: [...prevState.medicinesList, this.state.medicine]
        }))
    }


    addPrescription = (event) => {
        event.preventDefault();
        const newelement = {
            _id: null,
            prescriptionId: event.target[2].value,
            userMail: this.state.patientMail,
            dateTo: event.target[1].value,
            doctorMail: this.state.doctorMail,
            numberPWZ: this.state.numberPWZ,
            departmentNFZ: event.target[3].value,
            permissions: event.target[0].value,
            medicines: this.state.medicinesList
        }
        console.log(newelement)

        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/prescription', newelement, config, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Pomyślnie zapisano kartę")
                this.setState(prevState => ({
                    prescriptions: [...prevState.prescriptions, newelement]
                }))
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały zapisane ze względu na błędne dane")
            })
    }

    prepareForms(prescriptions, isDoctor) {
        return (
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                {prescriptions.map((prep) =>
                    <Grid key={prep.prescriptionId + prep.dateTo} item>
                        <Paper elevation={3} square={false} >
                            <ExpansionPanel expanded={this.state.expanded === prep.dateTo + prep._id} onChange={this.handleChangePanel(prep.dateTo + prep._id)}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography variant="h4" gutterBottom>
                                        Recepta {prep.prescriptionId}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Prescription prescription={prep} isDoctor={isDoctor} user={this.state.patientMail} />
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
        var date = tempDate.toISOString().split("T")[0];
        return (
            <React.Fragment>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="h4" gutterBottom>
                        Recepty
                    </Typography>
                </Grid>
                {this.prepareForms(this.state.prescriptions, this.state.isDoctor, this.state.patientMail)}
                {this.state.isDoctor ?
                    <Paper elevation={1} square>
                        <form onSubmit={this.addPrescription}>
                            <Grid
                                container
                                //direction="column"
                                justify="center"
                            // alignItems="center"
                            >
                                <Typography variant="h4" gutterBottom>
                                    Nowa recepta
                                </Typography>
                                <TextField
                                    fullWidth
                                    required
                                    id='purpose'
                                    label="Dodatkowe uprawnienia"
                                    margin="normal"
                                    variant="filled"
                                    name="testName" />
                                <TextField
                                    required
                                    id="date"
                                    label="Termin realizacji"
                                    type="date"
                                    margin="normal"
                                    defaultValue={date}
                                    fullWidth
                                    variant="filled"
                                    name="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    required
                                    id='purpose'
                                    label="Numer recepty"
                                    margin="normal"
                                    variant="filled"
                                    name="testName" />
                                <TextField
                                    fullWidth
                                    required
                                    id='purpose'
                                    label="Departament NFZ"
                                    margin="normal"
                                    variant="filled"
                                    name="testName" />
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center">
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Leki</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="right">{this.state.medicinesList.map(param =>
                                                    (<ListItem key={param} button>
                                                        <ListItemText primary={param} />
                                                    </ListItem>))}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <TextField
                                        required
                                        id='purpose'
                                        label="Lek"
                                        margin="normal"
                                        variant="filled"
                                        onChange={this.handleMedicineChange}
                                        name="testName" />
                                    <Grid item>
                                        <Button
                                            onClick={(e) => this.pushToMedicinesList(e)}
                                            id="button"
                                            color="primary"
                                            variant="contained"
                                        >Dodaj lek
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
                                        Zapisz nową receptę
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

const ConnectedPrescriptions = props => (
    <CardConsumer>
        {({ user, card, isDoctor, updateCard }) => (
            <Prescriptions
                {...props}
                card={card}
                user={user}
                updateCard={updateCard}
                isDoctor={isDoctor}
            />
        )}
    </CardConsumer>
)

export { ConnectedPrescriptions, Prescriptions }