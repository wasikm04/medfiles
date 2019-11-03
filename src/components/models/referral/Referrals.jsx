import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Referral from './Referral.jsx'
import TextField from '@material-ui/core/TextField';

class Referrals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referrals: this.props.card.referrals, //propsy podawane albo z karty albo ze zbiorczej karty edycji lekarza przez propsy
            isDoctor: this.props.isDoctor,
            doctorMail: this.props.user,
            patientMail: this.props.card.userMail,
            numberPWZ: this.props.numberPWZ
        };
        this.addReferral = this.addReferral.bind(this);
    }

    // handleChange = (event, id) => { 
    //     event.persist();
    //     this.setState(prevState => ({
    //         referrals: prevState.referrals.map(
    //             item => item._id === id ? { ...item, [event.target.id]: event.target.value } : item
    //         )
    //     }))
    // }


    addReferral = (event) => {
        event.preventDefault();
        const newelement = {
            _id: null,
            date: event.target[1].value,
            userMail: this.state.patientMail,
            purpose: event.target[0].value,
            recognition: event.target[2].value,
            doctorMail: this.state.doctorMail,
            numberPWZ: this.state.numberPWZ
        }
        console.log(newelement)

        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/referral', newelement, config, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Pomyślnie zapisano kartę")
                this.setState(prevState => ({
                    referrals: [...prevState.referrals, newelement]
                }))
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały zapisane ze względu na błędne dane")
            })
    }


    prepareForms(referrals, isDoctor, userMail) {
        return (
            <Grid container 
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={2}>
                {referrals.map((referral) =>
                    <Grid key={referral.date+referral._id} item>
                        
                        <Paper  elevation={3} square={false} >
                        <Typography variant="h4" gutterBottom>
                        Skierowanie {referral.date}
                        </Typography>
                            <Referral referral={referral} isDoctor={isDoctor} userMail={userMail} />
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
                        Skierowania
                        </Typography>
                </Grid>
                {this.prepareForms(this.state.referrals, this.state.isDoctor, this.state.patientMail)}   
                {this.state.isDoctor ?
                        <Paper elevation={1} square>
                            <form onSubmit={this.addReferral}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Typography variant="h4" gutterBottom>
                                    Nowe skierowanie
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        required
                                        id='purpose'
                                        label="Cel skierowania"
                                        margin="normal"
                                        variant="filled"
                                        name="purpose" />
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
                                    <TextField
                                        fullWidth
                                        required
                                        id='reckognition'
                                        label="Rozpoznanie"
                                        margin="normal"
                                        variant="filled"
                                        name="reckognition" />
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
                    
            </React.Fragment >
        );
    }
}


const ConnectedReferrals = props => (
    <CardConsumer>
        {({ card, isDoctor, user, updateCard }) => (
            <Referrals
                {...props}
                card={card}
                user={user}
                updateCard={updateCard}
                isDoctor={isDoctor}
            />
        )}
    </CardConsumer>
)

export { ConnectedReferrals, Referrals }