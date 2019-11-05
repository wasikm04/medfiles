import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Appointment from './Appointment'
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';


class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: null,
            isDoctor: this.props.isDoctor,
            user: this.props.user,
            doctorCard : this.props.doctorCard
        };
        this.addAppointment = this.addAppointment.bind(this);
    }

    addAppointment = (event) => {
        event.preventDefault();
        const newelement = {
            _id: null,
            patientMail: null, //""
            doctorMail: this.state.user,
            doctorFullName: this.state.doctorCard.firstName +" "+ this.state.doctorCard.lastName,
            dateTime: event.target[1].value,
            comment: event.target[0].value
        }
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/appointment', newelement, config, { withCredentials: true })
            .then((response) => {
                console.log(response);
                this.setState(prevState => ({
                    appointments: [...prevState.appointments, newelement]
                }))
                alert("Pomyślnie dodano termin wizyty")
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały zapisane ze względu na błędne dane")
            })
    }

    componentDidMount() {
        const axios = require('axios');
        var path = 'patient/'
        if (this.state.isDoctor) {
            path = 'doctor/'
        }
        axios.get('/appointment/' + path + this.state.user + "/", { withCredentials: true })
            .then((response) => {
                this.setState({
                    appointments: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały pobrane, spróbuj ponownie")
            })
    }

    renderAppointments(appointments, isDoctor) {
        return <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}>
            {appointments.map((appointment) =>
                <Grid key={appointment._id} item>
                    <Paper elevation={3} square={false} >
                        <Typography variant="h4" gutterBottom>
                            Wizyta {appointment.dateTime}
                        </Typography>
                        <Appointment appointment={appointment} isDoctor={isDoctor} />
                    </Paper>
                </Grid>
            )}
        </Grid>
    }

    render() {
        //this.getAppointments(this.state.isDoctor, this.state.user);
        return (
            <React.Fragment>
                
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h4" gutterBottom>
                            Terminy wizyt
                        </Typography>
                    </Grid>
                    <Paper elevation={1} square >
                    {this.state.appointments ? this.renderAppointments(this.state.appointments, this.state.isDoctor) : null}
                    {this.state.isDoctor ?
                        <Paper elevation={1} square>
                            <form onSubmit={this.addAppointment}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Typography variant="h4" gutterBottom>
                                    Nowa wizyta
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        required
                                        id='comment'
                                        label="Komentarz"
                                        margin="normal"
                                        variant="filled"
                                        name="comment" />
                                    <TextField
                                        required
                                        id="date"
                                        label="Data"
                                        type="datetime-local"
                                        margin="normal"
                                        fullWidth
                                        variant="filled"
                                        name="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        id="button"
                                        color="primary"
                                        variant="contained"
                                    >Dodaj
                                </Button>
                                </Grid>
                            </form>
                        </Paper>
                        : null}
                </Paper>
            </React.Fragment>
        )
    }
}


const ConnectedAppointments = props => (
    <CardConsumer>
        {({ isDoctor, user, doctorCard }) => (
            <Appointments
                {...props}
                isDoctor={isDoctor}
                user={user}
                doctorCard = {doctorCard}
            />
        )}
    </CardConsumer>
)

export default ConnectedAppointments