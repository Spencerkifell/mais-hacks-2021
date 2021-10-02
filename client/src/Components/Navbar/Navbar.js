import React, {useState, useEffect, useCallback} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography, IconButton } from '@material-ui/core';
import { GitHub, LinkedIn } from '@material-ui/icons';
import icon from '../../Images/boAIrd.png';
import useStyles from './styles'

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="sticky">
            <Toolbar className={classes.container}>
            <div>
                <Typography className={classes.title} variant="h1" align="left" component={Link} to="/">boAIrd</Typography>
            </div>
            <div>
                <Button color="inherit">FAQ</Button>
                <Button color="inherit">About</Button>
                <IconButton>
                    <LinkedIn className={classes.icons}/>
                </IconButton>
                <IconButton>
                    <GitHub className={classes.icons}/>
                </IconButton>
            </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
