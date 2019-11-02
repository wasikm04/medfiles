import labels from "../helpers/defaultLabels";
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const  objectFields = (card, isDoctor, handleChange) => {
    return (Object.keys(card).map(key => {
        if (key === "_id") {
            return null;
        }
        else if (Array.isArray(card[key]) ) {
            var spec = card[key].map((item) =>
                <ListItem key={item} button>
                    <ListItemText key={item} primary={item} />
                </ListItem>)
            return <Grid key={key} item xs={6} sm={6}>
                <Typography variant="h6" >
                    {labels[key]}
                </Typography>
                <List component="nav" aria-label="secondary mailbox folders">
                    {spec}
                </List>
            </Grid>
        } else {
            return <Grid key={key} item xs={6} sm={6}> <TextField
                required
                fullWidth
                disabled={!isDoctor}
                id={key}
                label={labels[key]}
                defaultValue={card[key]}
                onChange={handleChange}
                margin="normal"
                variant="filled" />
            </Grid>
        }
    })
    )
};

export default objectFields;