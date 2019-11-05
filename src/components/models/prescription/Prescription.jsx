import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import objectFields from '../ObjectFields'

export default class MedicalTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescription: this.props.prescription,
            patientMail: this.props.user,
            isDoctor: this.props.isDoctor,
        };
        this.savePrescription = this.savePrescription.bind(this);
    }

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var prescription = { ...prevState.prescription };
            prescription[event.target.id] = event.target.value;
            return { prescription };
        })
    }


    savePrescription = (event) => {
        console.log(event);
        event.preventDefault();
        const completedPrescription = { ...this.state.prescription, userMail: this.state.patientMail }
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put('/prescription', completedPrescription, config, { withCredentials: true })
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
                key={this.state.prescription._id}
                className={{
                    container: {
                        display: 'flex',
                        flexWrap: 'wrap',
                    }
                }}
                onSubmit={this.savePrescription}>
                <Grid
                    container
                    justify="space-around"
                    //spacing={2}
                    //direction="column"
                    alignItems="center"
                >
                    {objectFields(this.state.prescription, this.state.isDoctor, this.handleChange)}
                    {this.state.isDoctor ?
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
                        :
                        null}
                </Grid>
            </form>
        )
    }
}