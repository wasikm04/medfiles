import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Referral from './Referral.jsx'
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class Referrals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referrals: this.props.card.referrals,
            isDoctor: this.props.isDoctor,
            doctorMail: this.props.user,
            patientMail: this.props.card.userMail,
            numberPWZ: this.props.numberPWZ,
            expanded: ""
        };
        this.addReferral = this.addReferral.bind(this);
    }

    handleChangePanel = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

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
                    <Grid key={referral.date + referral._id} item>
                        <Paper elevation={3} square={false} >
                            <ExpansionPanel expanded={this.state.expanded === referral.date + referral._id} onChange={this.handleChangePanel(referral.date + referral._id)}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography variant="h4" gutterBottom>
                                        Skierowanie {referral.date}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Referral referral={referral} isDoctor={isDoctor} userMail={userMail} />
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