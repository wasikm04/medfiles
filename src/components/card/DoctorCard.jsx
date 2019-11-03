import React, { Component } from 'react';
import { CardConsumer } from '../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import objectFields from '../models/ObjectFields'
import MakeAppointment from '../models/appointment/MakeAppointment'
class DoctorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorCard: this.props.doctorCard,
            isDoctor: this.props.isDoctor
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var doctorCard = { ...prevState.doctorCard };
            doctorCard[event.target.id] = event.target.value;
            return { doctorCard };
        }
        )
    }

    componentDidMount() {
        if (!this.state.isDoctor) {
            this.getDoctorCard(this.props.match.params.doctorMail);
        }
    }

    getDoctorCard(doctorMail) {
        const axios = require('axios');
        axios.get('/doctor-card/' + doctorMail + '/', { withCredentials: true })
            .then((response) => {
                this.setState({ doctorCard: response.data });
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put('/doctor-card', this.state.doctorCard, config, { withCredentials: true })
            .then((response) => {
                this.props.updateCard({
                    doctorCard: this.state.doctorCard
                });
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
            <React.Fragment>
                <Paper elevation={1} square >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h4" gutterBottom>
                            Karta lekarza
                        </Typography>
                    </Grid>
                    <form className={{
                        container: {
                            display: 'flex',
                            flexWrap: 'wrap',
                        }
                    }} onSubmit={this.handleSubmit}>
                        {this.state.doctorCard !== null ?
                        <Grid
                            container
                            justify="space-around"
                        >
                            {objectFields(this.state.doctorCard, this.state.isDoctor, this.handleChange)}
                        </Grid>
                        : null}
                        {this.state.isDoctor ? 
                        <Grid
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
                            >Zapisz
                            </Button>
                        </Grid>
                        :
                        this.state.doctorCard !== null ? <MakeAppointment doctorMail={this.state.doctorCard.userMail} patientMail={this.props.user} /> : null }
                    </form>
                </Paper>
            </React.Fragment >
        );
    }
}

const ConnectedDoctorCard = props => (
    <CardConsumer>
        {({ doctorCard, isDoctor, updateCard, user }) => (
            <DoctorCard
                {...props}
                doctorCard={doctorCard}
                updateCard={updateCard}
                isDoctor={isDoctor}
                user={user}
            />
        )}
    </CardConsumer>
)

export default ConnectedDoctorCard