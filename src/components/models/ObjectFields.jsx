import labels from "../helpers/defaultLabels";
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';


const objectFields = (card, isDoctor, handleChange) => {
    return (Object.keys(card).map(key => {
        if (key === "_id" || key === "userMail") {
            return null;
        } else if (key === "date" || key === "dateTo" || key === "testDate") {
            return <Grid key={key} item xs={6} sm={6}>
                <TextField
                    key={key}
                    //required
                    disabled
                    id={key}
                    label={labels[key]}
                    type="date"
                    margin="normal"
                    fullWidth
                    variant="filled"
                    defaultValue={card[key]}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => handleChange(e, card._id)}
                />
            </Grid>
        }
        else if (key === "dateTime") {
            return <Grid key={key} item xs={6} sm={6}>
                <TextField
                    key={key}
                    //required
                    disabled
                    id={key}
                    label={labels[key]}
                    type="datetype-local"
                    margin="normal"
                    fullWidth
                    variant="filled"
                    defaultValue={card[key]}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => handleChange(e, card._id)}
                />
            </Grid>
        }
        else if (key === "fileId") {
            return null
        }
        else if (key === "patientMail") {
            return <Grid key={key} item xs={6} sm={6}>
                <TextField
                    disabled={isDoctor}
                    fullWidth
                    id={key}
                    label={labels[key]}
                    defaultValue={card[key]}
                    onChange={(e) => handleChange(e, card._id)}
                    margin="normal"
                    variant="filled" />
                {card[key] != null && isDoctor ?
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <Link key={key} to={"/patient-card/" + card[key]}>
                            <Button
                                id="button"
                                color="primary"
                                variant="contained"
                            >
                                Karta Pacjenta
                        </Button>
                        </Link>
                    </Grid>
                    : null}
            </Grid>

        }
        else if (key === "comment") {
            return <Grid key={key} item xs={6} sm={6}>
                <TextField
                    fullWidth
                    id={key}
                    label={labels[key]}
                    defaultValue={card[key]}
                    onChange={(e) => handleChange(e, card._id)}
                    margin="normal"
                    variant="filled" />
            </Grid>
        }
        else if (key === "information") {
            return <Grid key={key} item xs={6} sm={6}>
                <TextField
                    fullWidth
                    multiline
                    row={2}
                    id={key}
                    label={labels[key]}
                    defaultValue={card[key]}
                    onChange={(e) => handleChange(e, card._id)}
                    margin="normal"
                    variant="filled" />
            </Grid>
        }
        else if (Array.isArray(card[key])) {
            var spec = card[key].map((item) =>
                <ListItem key={item} button>
                    <ListItemText key={item} primary={item} />
                </ListItem>)
            return <Grid key={key} item xs={6} sm={6}>
                <Grid key={key} item container justify="center" xs={6} sm={6}>
                    <Typography variant="h6" >
                        {labels[key]}
                    </Typography>
                </Grid>
                <List component="nav" aria-label="secondary mailbox folders">
                    {spec}
                </List>
            </Grid>
        } else {
            return <Grid key={key} item xs={6} sm={6}> <TextField
                //required
                fullWidth
                disabled
                id={key}
                label={labels[key]}
                defaultValue={card[key]}
                onChange={(e) => handleChange(e, card._id)}
                margin="normal"
                variant="filled" />
            </Grid>
        }
    })
    )
};

export default objectFields;