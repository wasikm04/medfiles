import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import objectFields from '../ObjectFields'

export default class Referral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referral: this.props.referral, //propsy podawane albo z karty albo ze zbiorczej karty edycji lekarza
            isDoctor: this.props.isDoctor,
        };
        this.saveReferral = this.saveReferral.bind(this);
    }

    handleChange = event => {
        // event.persist()
        // this.setState(prevState => {
        //     var referral = { ...prevState.referral };
        //     referral[event.target.id] = event.target.value;
        //     return { referral };
        // })
        this.props.handleChangeGlobal(event, this.props.referral._id);
    }

    saveReferral = (event) =>{
        event.preventDefault();
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put('/referral', this.state.referral, config, { withCredentials: true })
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
                key={this.state.referral._id}
                className={{
                    container: {
                        display: 'flex',
                        flexWrap: 'wrap',
                    }
                }}
                onSubmit={this.saveReferral}>
                <Grid
                    container
                    justify="space-around"
                    spacing={2}
                >
                    {objectFields(this.state.referral, this.state.isDoctor, this.handleChange)}
                </Grid>
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
            </form>
        )
    }
}

