import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import objectFields from '../ObjectFields'
export default class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: this.props.appointment,
            isDoctor: this.props.isDoctor,
        };
        this.saveAppointment = this.saveAppointment.bind(this);
    }

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var appointment = { ...prevState.appointment };
            appointment[event.target.id] = event.target.value;
            return { appointment };
        })
    }

    deleteReservation = (event) => {
        event.preventDefault();
        const app = this.state.appointment;
        app.patientMail = null;
        this.update(app);
        this.setState({ appointment: null })
    }

    saveAppointment = (event) => {
        event.preventDefault();
        this.update(this.state.appointment);
    }

    update(appointment) {
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put('/appointment', appointment, config, { withCredentials: true })
            .then((response) => {
                alert("Pomyślnie zapisano kartę")
            })
            .catch(function (error) {
                alert("Dane nie zostały zapisane ze względu na błędny/już istniejący email")
            })
    }

    render() {
        return (
            <form
                key={this.state.appointment != null ? this.state.appointment._id : 1}
                className={{
                    container: {
                        display: 'flex',
                        flexWrap: 'wrap',
                    }
                }}
                onSubmit={this.saveAppointment}>

                <Grid
                    container
                    justify="space-around"
                    spacing={2}
                >
                    {this.state.appointment != null ?
                        objectFields(this.state.appointment, this.state.isDoctor, this.handleChange)
                        : null}
                </Grid>
                {this.state.appointment != null ?
                    <Grid
                        key
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button
                            type="submit"
                            id="button"
                            color="primary"
                            variant="contained"
                        >
                            Zapisz
                        </Button>
                        {!this.state.isDoctor ?
                            <Button
                                onClick={(e) => this.deleteReservation(e)}
                                id="button"
                                color="primary"
                                variant="contained"
                            >
                                Usuń
                        </Button>
                            : null}
                    </Grid>
                    : null}
            </form>
        )
    }
}