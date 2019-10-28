import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const Welcome = () => {
    return (
    <Grid item xs={6}
        direction="row"
        alignItems="center">
        <Card>
            <Typography
                variant="h6"
                component="h4"
                align="center"
                paragraph>
                Witaj na stronie do zarządzania kartotekami medycznymi, możesz tu dokonać przeglądu swojej karty lub umówić wizytę u lekarza.
            </Typography>
        </Card>
    </Grid>
    )
};

export default Welcome;