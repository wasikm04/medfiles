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
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import DescriptionIcon from '@material-ui/icons/Description';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { CardContext } from './providers/CardProvider';

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
        background: 'rgb(24, 32, 44)',
        colour: 'rgb(238, 238, 238)'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    colour: {
        background: 'rgb(35, 47, 62)',
        color: "white",
        textDecoration: 'none',
    },
    link: {
        textDecoration: 'none',
        color: 'rgb(238, 238, 238)'
    }
}));


export default function PermanentDrawerLeft() {
    const classes = useStyles();
    const { user, isAuthenticated, isDoctor } = useContext(CardContext);

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
                <Link className={classes.colour} to="/">
                    <div className={classes.toolbar} >
                        <Typography className={classes.toolbar} variant="h4" align="center" justify="center">
                            MedFiles
                        </Typography>
                    </div>
                </Link>
                <Divider />
                {isAuthenticated ?
                    <List>
                        <Link to="/home">
                            <ListItem button className={classes.link}>
                                <ListItemIcon className={classes.link}><DashboardIcon /></ListItemIcon>
                                <ListItemText primary={"Strona Główna"} />
                            </ListItem>
                        </Link>
                        <Divider className={classes.colour} />
                        {isDoctor ?
                        <div>
                            <Link to={"/doctor-card/" + user}  >
                                <ListItem button className={classes.link}>
                                    <ListItemIcon className={classes.link}><DescriptionRoundedIcon /></ListItemIcon>
                                    <ListItemText primary={"Karta Lekarza"} />
                                </ListItem>
                            </Link>
                            <Link to="/doctor-appointments">
                            <ListItem button className={classes.link}>
                                <ListItemIcon className={classes.link}><EventRoundedIcon /></ListItemIcon>
                                <ListItemText primary={"Wizyty"} />
                            </ListItem>
                        </Link>
                        </div>
                            :
                            <div>
                                <Link to="/card">
                                    <ListItem button className={classes.link}>
                                        <ListItemIcon className={classes.link}><AssignmentIndRoundedIcon /></ListItemIcon>
                                        <ListItemText primary={"Karta Pacjenta"} />
                                    </ListItem>
                                </Link>
                                <Link to="/medical-tests">
                                    <ListItem button className={classes.link}>
                                        <ListItemIcon className={classes.link}><AssessmentIcon /></ListItemIcon>
                                        <ListItemText primary={"Badania"} />
                                    </ListItem>
                                </Link>
                                <Link to="/prescriptions">
                                    <ListItem button className={classes.link}>
                                        <ListItemIcon className={classes.link}><NoteAddIcon /></ListItemIcon>
                                        <ListItemText primary={"Recepty"} />
                                    </ListItem>
                                </Link>
                                <Link to="/referrals">
                                    <ListItem button className={classes.link}>
                                        <ListItemIcon className={classes.link}><FeaturedPlayListIcon /></ListItemIcon>
                                        <ListItemText primary={"Skierowania"} />
                                    </ListItem>
                                </Link>
                                <Link to="/treatments">
                                    <ListItem button className={classes.link}>
                                        <ListItemIcon className={classes.link}><DescriptionIcon /></ListItemIcon>
                                        <ListItemText primary={"Historia chorób"} />
                                    </ListItem>
                                </Link>
                                <Link to="/appointments">
                                    <ListItem button className={classes.link}>
                                        <ListItemIcon className={classes.link}><EventRoundedIcon /></ListItemIcon>
                                        <ListItemText primary={"Wizyty"} />
                                    </ListItem>
                                </Link>
                            </div>
                        }
                        <Divider className={classes.colour} />
                        <Link to="/logout">
                            <ListItem button className={classes.link}>
                                <ListItemIcon className={classes.link}><ExitToAppRoundedIcon /></ListItemIcon>
                                <ListItemText primary={"Wyloguj"} />
                            </ListItem>
                        </Link>
                    </List>
                    :
                    <List>
                        <Link to="/login" >
                            <ListItem button className={classes.link}>
                                <ListItemIcon className={classes.link}><LockOpenIcon /></ListItemIcon>
                                <ListItemText primary={"Logowanie"} />
                            </ListItem>
                        </Link>
                        <Link to="/register">
                            <ListItem button className={classes.link}>
                                <ListItemIcon className={classes.link}><NoteAddRoundedIcon /></ListItemIcon>
                                <ListItemText primary={"Rejestracja"} />
                            </ListItem>
                        </Link>
                    </List>}
                <Divider />
            </Drawer>
        </div >
    )
}
