import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { CardContext } from './providers/CardProvider';
import Container from '@material-ui/core/Container';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        background: 'rgb(232,232,232)',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    colour: {
        background: 'indigo',
        color: "white"
    },
    back: {
        background: 'rgb(128,128,128)'
    }
}));


export default function PermanentDrawerLeft() {
    const classes = useStyles();
    const { isAuthenticated, isDoctor } = useContext(CardContext);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">
                <Link className={classes.colour} to="/" color="textPrimary">
                    <Container className={classes.toolbar} >
                        <Typography  variant="h4" align="center" justify="center">
                           znaczek _ MedFiles
                        </Typography>
                    </Container>
                </Link>
                <Divider />
                {isAuthenticated ?
                    <List>
                        <Link to="/home" color="textPrimary">
                            <ListItem button >
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText secondary={"Strona Główna"} />
                            </ListItem>
                        </Link>
                        {isDoctor ?
                            <Link to="/profile" color="textPrimary">
                                <ListItem button >
                                    <ListItemIcon><DescriptionRoundedIcon /></ListItemIcon>
                                    <ListItemText secondary={"Karta Pacjenta"} />
                                </ListItem>
                            </Link> :
                            <Link to="/doctor-card" color="textPrimary">
                                <ListItem button >
                                    <ListItemIcon><AssignmentIndRoundedIcon /></ListItemIcon>
                                    <ListItemText secondary={"Karta Lekarza"} />
                                </ListItem>
                            </Link>
                        }
                        <Link to="/appointments" color="textPrimary">
                            <ListItem button >
                                <ListItemIcon><EventRoundedIcon /></ListItemIcon>
                                <ListItemText secondary={"Wizyty"} />
                            </ListItem>
                        </Link>

                        <Divider />
                        <Link to="/logout" color="textPrimary">
                            <ListItem button >
                                <ListItemIcon><ExitToAppRoundedIcon /></ListItemIcon>
                                <ListItemText secondary={"Wyloguj"} />
                            </ListItem>
                        </Link>
                    </List>
                    :
                    <List>
                        <Link to="/login" color="textPrimary">
                            <ListItem button >
                                <ListItemIcon><LockOpenIcon /></ListItemIcon>
                                <ListItemText secondary={"Logowanie"} />
                            </ListItem>
                        </Link>
                        <Link to="/register" color="textPrimary">
                            <ListItem button >
                                <ListItemIcon><NoteAddRoundedIcon /></ListItemIcon>
                                <ListItemText secondary={"Rejestracja"} />
                            </ListItem>
                        </Link>
                    </List>}
                <Divider />
            </Drawer>
        </div >
    )
}
