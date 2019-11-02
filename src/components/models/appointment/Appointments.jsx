import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

const colour = {
    background: 'rgb(35, 47, 62)',
    color: "white",
    textDecoration: 'none',
}
export default class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: null,
            doctors: null,
            search: ''
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    changeSelect = event => {
        this.setState({
            search: event.target.value
        })
    }

    getPage(page) {
        const axios = require('axios');
        axios.get('/doctor-card/list/' + page, { withCredentials: true })
            .then((response) => {
                this.setState({
                    doctors: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
                alert("Dane nie zostały pobrane, spróbuj ponownie")
            })
    }

    componentDidMount() {
        this.getPage(0);
    }

    handlePageClick = data => {
        let selected = data.selected
        this.getPage(selected);
    }

    handleSearch = (event, search) => {
        //event.preventDefault()
        if (search !== '') {
            this.setState({
                doctors: null
            })
            console.log("strzelam")
            const axios = require('axios');
            axios.get('/doctor-card/list/0?text=' + search, { withCredentials: true })
                .then((response) => {
                    console.log("odbieram")
                    console.log(response)
                    this.setState({
                        doctors: response.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Dane nie zostały pobrane, spróbuj ponownie")
                })
        }
    }


    renderTable = (doctors) => {
        if (doctors !== null) {
            return (<Paper >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Imię i nazwisko</TableCell>
                            <TableCell align="right">Specjalizacje</TableCell>
                            <TableCell align="right">Adres email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.content.map(doctor => (
                            <TableRow key={doctor.userMail}>
                                <TableCell component="th" scope="row">
                                    <Link className={colour} to={"/doctor-card/" + doctor.userMail}>
                                        {doctor.firstName + " " + doctor.lastName}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{doctor.specializations.map(spec =>
                                    (<ListItem key={spec} button>
                                        <ListItemText primary={spec} />
                                    </ListItem>))}
                                </TableCell>
                                <TableCell align="right">{doctor.userMail}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper >
            )
        }
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
                            Kartoteki lekarzy
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <TextField
                                id="standard-basic"
                                label="Wyszukaj lekarza"
                                margin="normal"
                                onChange={this.changeSelect}
                            />
                            <Button
                                onClick={(e) => this.handleSearch(e, this.state.search)}
                                //onClick={this.handleSearch(this.state.search)}
                                id="button"
                            >Szukaj
                        </Button>
                        </Grid>
                    </Grid>
                    {this.state.doctors !== null ?
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            {this.renderTable(this.state.doctors)}
                            <ReactPaginate
                                previousLabel={'Poprzednia'}
                                nextLabel={'Następna'}
                                breakLabel={'...'}
                                pageCount={this.state.doctors.totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                subContainerClassName={'pages pagination'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                activeClassName={'active'}
                            />
                        </Grid>
                        :
                        <Typography variant="h4" component="h3" align="center" margin="normal">
                            <CircularProgress align="center" />
                        </Typography>
                    }
                </Paper>
            </React.Fragment>
        )
    }
}
