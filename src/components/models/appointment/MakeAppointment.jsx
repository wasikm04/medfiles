import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

export default class MakeAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorMail: this.props.doctorMail,
            patientMail: this.props.patientMail,
            appointments: null,
        };
        this.reserve = this.reserve.bind(this)
    }
  
    componentDidMount(){
        const axios = require('axios');
        axios.get('/appointment/' + this.state.doctorMail , { withCredentials: true })
            .then((response) => {
                this.setState({ appointments: response.data });
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            })
    }

    reserve(choosen, patientMail) {
        if (choosen != null) {
            choosen.patientMail = patientMail
            const axios = require('axios');
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.put('/appointment', choosen, config, { withCredentials: true })
                .then((response) => {
                    console.log(response);
                    const items = this.state.appointments.filter(item => item._id !== choosen._id);
                    this.setState({ appointments: items });
                    alert("Pomyślnie zapisano kartę")
                    
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Dane nie zostały zapisane ze względu na błędny/już istniejący email")
                })
        }
    }

    showAppointmentsTable(appointments, patientMail) {
        return (<Paper >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Data wizyty</TableCell>
                        <TableCell align="right">Komentarz</TableCell>
                        <TableCell align="right">Rezerwacja</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map(app => (
                        <TableRow key={app._id}>
                            <TableCell component="th" scope="row">
                                <TextField
                                    type="datetype-local"
                                    margin="normal"
                                    fullWidth
                                    variant="filled"
                                    defaultValue={app.dateTime}
                                />
                            </TableCell>
                            <TableCell align="right">{app.comment}</TableCell>
                            <TableCell align="right"><Button
                                onClick={() => this.reserve(app, patientMail)}
                                // type="submit"
                                id="button"
                                color="primary"
                                variant="contained"
                            >Zarezerwuj
                        </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper >
        )
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
                            Terminy wizyt
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        justify="space-around"
                    >
                        {this.state.appointments != null ? this.showAppointmentsTable(this.state.appointments, this.state.patientMail) : null}
                    </Grid>
                </Paper>
            </React.Fragment >
        );
    }
}
