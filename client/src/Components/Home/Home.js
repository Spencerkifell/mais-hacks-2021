import React, {useEffect, useState} from 'react';
import { Container, Grow, Grid, Paper, Typography, Button, Icon } from '@material-ui/core' ;
import { Build, Gamepad } from '@material-ui/icons';
import Input from './Input';
import useStyles from './styles';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

function Home() {
    const styles = useStyles();

    const initialRoomState = {name: "", title: ""};

    const [newRoomFormData, setNewRoomFormData] = useState(initialRoomState);

    const handleCreateFormChange = (event) => {
        setNewRoomFormData({...newRoomFormData, [event.target.name]: event.target.value})
    }

    const createNewGame = (event) => {
        event.preventDefault();
        localStorage.setItem("name", newRoomFormData.name);
        //generate random id...
        //create new user.
        socket.emit('create-room', newRoomFormData.title, newRoomFormData.title, newRoomFormData.name);
    }

    return (
        <Grow in>
            <Container maxWidth="xs">
                <Paper className={styles.paper} elevation={3}>
                    <Build className={styles.icon}/>
                    <Typography className={styles.newGameTitle} variant="h5">Generate New Game</Typography>
                    <form className={styles.form} onSubmit={createNewGame}>
                        <Grid container spacing={2} justifyContent="center" className={styles.grid}>
                            <Input fullWidth variant="contained" name="title" label="Input Title Of Game" handleChange={handleCreateFormChange} type="text"/>
                            <Input fullWidth variant="contained" name="name" label="Enter Alias" handleChange={handleCreateFormChange} type="text"/>
                            <Button className={styles.test} type="submit" variant="contained" color="primary" className={styles.submit}>Generate</Button> 
                        </Grid>
                    </form>
                </Paper>
                <Paper className={styles.paper} elevation={3}>
                    <Gamepad className={styles.icon}/>
                    <Typography className={styles.newGameTitle} variant="h5">Join Existing Game</Typography>
                    <form className={styles.form}>
                        <Grid container spacing={2} justifyContent="center" className={styles.grid}>
                            <Input fullWidth variant="contained" name="name" label="Enter Alias" handleChange={() => {}} type="text"/>
                            <Input fullWidth variant="contained" name="roomId" label="Join Existing Room" handleChange={() => {}} type="text"/>
                            <Button className={styles.test} type="submit" variant="contained" color="primary" className={styles.submit}>Join</Button> 
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Grow>
    )
}

export default Home
