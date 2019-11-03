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

    saveAppointment = (event) =>{
        event.preventDefault();
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put('/appointment', this.state.appointment, config, { withCredentials: true })
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
            <form 
                key={this.state.appointment._id}
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
                    {objectFields(this.state.appointment, this.state.isDoctor, this.handleChange)}
                </Grid>   
                    <Grid
                        key
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Button
                            type="submit"
                            id="button"
                            color="primary"
                            variant="contained"
                            >
                            Zapisz
                        </Button>
                    </Grid>
            </form>
        )
    }
}