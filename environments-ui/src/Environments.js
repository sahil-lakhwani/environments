import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

import environments from "./resources/environments.json";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '300px',
        width: '200px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    checkBox: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Environments() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(['all']);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        let newChecked = [...checked];
        if (value == 'all') {
            newChecked = ['all']
        } else {
            const index = newChecked.indexOf('all');
            if (index > -1) {
                delete newChecked[index]
            }
            newChecked.push(value);
        }
        setChecked(newChecked);
    };
    return (
        <div style={{
            display : 'flex'
        }}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Clipped drawer
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List dense className={classes.checkBox}>
                        <ListItem key='all' button>
                            <ListItemText id='all' primary={`Select all environment`} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle('all')}
                                    checked={checked.indexOf('all') !== -1}
                                    inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-all` }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        {environments.map((env) => {
                            const value = env[0].name.split(' ')[0]
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem key={value} button>
                                    <ListItemText id={labelId} primary={`Select ${value} environment`} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(value)}
                                            checked={checked.indexOf(value) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <Grid container spacing={4}>{
                    environments.map(function (envs, index) {
                        const env = envs[0]
                        const value = env.name.split(' ')[0]
                        if ( checked.indexOf('all') > -1 || checked.indexOf(value) > -1) {
                            return (
                                <Grid item key={index}>
                                    <Card className={classes.root}>
                                        <CardActionArea href={env.readme}>
                                            <CardMedia
                                                style={{
                                                    objectFit: 'fill',
                                                    height: '100px',
                                                    paddingLeft: '5px',
                                                    paddingRight: '5px',
                                                    paddingTop:'5px'
                                                }}
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image={env.icon}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography variant="body1" component="h2" >
                                                    {env.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {env.shortDescription}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        {/* <CardActions>
                    <Button size="small" color="primary">
                      Share
        </Button>
                    <Button size="small" color="primary">
                      Learn More
        </Button>
                  </CardActions> */}
                                    </Card>
                                </Grid>
                            )}
                    })
                }
                </Grid>
            </main>
        </div>
    );
}