import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
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
                <a href="https://github.com/Spencerkifell/mais-hacks-2021" target="_blank">
                    <IconButton>
                        <GitHub className={classes.icons}/>
                    </IconButton>
                </a>
            </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
