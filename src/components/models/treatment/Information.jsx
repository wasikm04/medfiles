import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'

function Information (props){
    return(
        <Paper elevation={1} square>
                        <form onSubmit={props.handleChange != null ? props.handleChange : null}>
                            <Grid
                                container
                                //direction="column"
                                justify="center"
                                //alignItems="center"
                            >
                                {props.information != null && props.information.doctorMail != null ? 
                                <Typography variant="h4" gutterBottom>
                                    Autor zapisu 
                                    <Link to={"/doctor-card/" + props.information.doctorMail}>
                                        {" " + props.information.doctorMail}
                                    </Link>
                                </Typography>
                                : null }
                                <TextField
                                    required
                                    id="date"
                                    disabled={!props.isDoctor}
                                    label="Data"
                                    type="date"
                                    margin="normal"
                                    defaultValue={props.information != null ? props.information.date : null}
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
                                    disabled={!props.isDoctor}
                                    defaultValue={props.information != null ? props.information.information : null}
                                    id='purpose'
                                    label="Opis"
                                    margin="normal"
                                    variant="filled"
                                    name="testName" /> 
                                {props.isDoctor ? 
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center">
                                    <Button
                                        type="submit"
                                        id="button"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Zapisz wyniki
                                    </Button>
                                </Grid>
                                : null}
                            </Grid>
                        </form>
                    </Paper>
    )
}

export default Information