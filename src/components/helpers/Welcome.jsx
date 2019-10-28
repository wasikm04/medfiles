import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const Welcome = () => {
    return (
    <Grid item xs={6}
        direction="rows"
        justify="center"
        alignItems="center">
        <Card>
            <Typography
                variant="h8"
                component="h4"
                align="center"
                paragraph>
                Witaj na stronie do zarządzania kartotekami medycznymi, zaloguj się aby uzyskać dostęp do kartoteki lub załóż konto aby utworzyć własną kartę.
            </Typography>
        </Card>
    </Grid>
    )
};

export default Welcome;