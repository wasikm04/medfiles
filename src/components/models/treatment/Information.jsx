import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function Information (props){
    console.log("Information");
    console.log(props);
    return(
        
        <Paper elevation={1} square>
                        <form onSubmit={props.handleChange != null ? props.handleChange : null}>
                            <Grid
                                container
                                //direction="column"
                                justify="center"
                                //alignItems="center"
                            >
                                <Typography variant="h4" gutterBottom>
                                    Nowe informacja
                                </Typography>
                                <TextField
                                    required
                                    id="date"
                                    disabled={!props.isDoctor}
                                    label="Data"
                                    type="date"
                                    margin="normal"
                                    defaultValue={this.props.information != null ? this.props.information.date : null}
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
                                    defaultValue={this.props.information != null ? this.props.information.information : null}
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