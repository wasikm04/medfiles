import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Referral from './Referral.jsx'

class Referrals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referrals: this.props.card.referrals, //propsy podawane albo z karty albo ze zbiorczej karty edycji lekarza przez propsy
            isDoctor: this.props.isDoctor,
            user: this.props.user
        };
        this.addReferral = this.addReferral.bind(this);
    }

    handleChange = (event, id) => { // (e) => this.handleChange(e, id)
        event.persist();
        this.setState(prevState => ({
            referrals: prevState.referrals.map(
                item => item._id === id ? { ...item, [event.target.id]: event.target.value } : item
            )
        }))
    }


    addReferral = () => {
        var userMail = this.state.user;
        const newelement = {
            _id: null,
            date: "",
            userMail: { userMail },
            purpose: "",
            recognition: "",
            doctorMail: "",
            numberPWZ: ''
        }
        this.setState(prevState => ({
            referrals: [...prevState.referrals, newelement]
        }))


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
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały zapisane ze względu na błędne dane")
            })
    }


    prepareForms(referrals, isDoctor, handleChange) {
        return (
            <Grid container 
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={2}>
                {referrals.map((referral) =>
                    <Grid key={referral._id} item>
                        
                        <Paper  elevation={3} square={false} >
                        <Typography variant="h4" gutterBottom>
                        Skierowanie {referral.date}
                        </Typography>
                            <Referral referral={referral} isDoctor={isDoctor} handleChangeGlobal={handleChange} />
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
                    //direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="h4" gutterBottom>
                        Skierowania
                        </Typography>
                </Grid>
                {this.prepareForms(this.state.referrals, this.state.isDoctor, this.handleChange)}
                {this.state.isDoctor ?
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Button
                            onClick={this.addReferral}
                            id="button"
                            color="primary"
                            variant="contained"
                        >Dodaj
                        </Button>
                    </Grid>
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