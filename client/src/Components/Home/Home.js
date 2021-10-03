import React, {useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper, Typography, Button } from '@material-ui/core' ;
import { Build, Gamepad } from '@material-ui/icons';
import Input from './Input';
import useStyles from './styles';

import io from 'socket.io-client';
import Lobby from '../Lobby/Lobby';
const socket = io.connect('http://localhost:4000');

var room;

function Home() {
    const styles = useStyles();

    const initialRoomState = {name: "", title: ""};
    const existingRoomState = {name: "", id: ""};

    const [newRoomFormData, setNewRoomFormData] = useState(initialRoomState);
    const [existingRoomFormData, setExistingRoomFormData] = useState(existingRoomState);
    const [inRoom, setInRoom] = useState(false);

    // Form Input Handlers

    const handleCreateFormChange = (event) => {
        setNewRoomFormData({...newRoomFormData, [event.target.name]: event.target.value});
    }

    const handleExistingFormChange = (event) => {
        setExistingRoomFormData({...existingRoomFormData, [event.target.name]: event.target.value});
    }

    // Create New Game

    const createNewGame = (event) => {
        event.preventDefault();
        localStorage.setItem("name", newRoomFormData.name);
        fetch(`http://weinsteininternet.ddns.net:8000/predict?input_str=${newRoomFormData.title}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                socket.emit('create-room', {userName: newRoomFormData.name, title: newRoomFormData.title, rules: response?.prediction});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    socket.on('success-create', (roomData) => {
        room = roomData;
        setInRoom(true);
    })

    // Join Existing Game

    const joinExistingGame = (event) => {
        event.preventDefault();
        localStorage.setItem("name", existingRoomFormData.name);
        socket.emit('join-room', {userName: existingRoomFormData.name, roomId: existingRoomFormData.roomId});
    }

    socket.on('success-join', (roomData) => {
        room = roomData;
        setInRoom(true);
    })

    //TODO Explain to the user why it failed (If we get the time)...
    socket.on('failed-join', (reason) => {
        switch(reason){
            case "ID":
                break;
            case "NAME":
                break;
        }
    })

    return (
        <Grow in>
            { !inRoom ? (
                <Container maxWidth="xs">
                    {/* Form to generate a new game */}
                    <Paper className={styles.paper} elevation={3}>
                        <Build className={styles.icon}/>
                        <Typography className={styles.newGameTitle} variant="h5">Generate New Game</Typography>
                        <form className={styles.form} onSubmit={createNewGame}>
                            <Grid container spacing={2} justifyContent="center" className={styles.grid}>
                                <Input fullWidth variant="contained" name="title" label="Input Title Of Game" handleChange={handleCreateFormChange} type="text"/>
                                <Input fullWidth variant="contained" name="name" label="Enter Alias" handleChange={handleCreateFormChange} type="text"/>
                                <Button type="submit" variant="contained" color="primary" className={styles.submit}>Generate</Button> 
                            </Grid>
                        </form>
                    </Paper>

                    {/* Form to join an existing game */}
                    <Paper className={styles.paper} elevation={3}>
                        <Gamepad className={styles.icon}/>
                        <Typography className={styles.newGameTitle} variant="h5">Join Existing Game</Typography>
                        <form className={styles.form} onSubmit={joinExistingGame}>
                            <Grid container spacing={2} justifyContent="center" className={styles.grid}>
                                <Input fullWidth variant="contained" name="name" label="Enter Alias" handleChange={handleExistingFormChange} type="text"/>
                                <Input fullWidth variant="contained" name="roomId" label="Join Existing Room" handleChange={handleExistingFormChange} type="text"/>
                                <Button type="submit" variant="contained" color="primary" className={styles.submit}>Join</Button> 
                            </Grid>
                        </form>
                    </Paper>
                </Container>

                ) : (
                    // This means we are currently in a lobby so we can remove the forms and open the chatroom.
                    <Lobby {...room}/>
                )
            }
        </Grow>
    )
}

export default Home
