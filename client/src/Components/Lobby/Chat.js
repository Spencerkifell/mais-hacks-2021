import React, { useState } from 'react'

import { Paper, TextField, Typography, IconButton, Icon, Container } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import Input from './Input';
import useStyles from './styles';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');


function Chat(currentUser) {
    const styles = useStyles();
    const [currentMessage, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit("send-message", {content: event.target.value, currentUser} );
    }

    socket.on('new-message', (payload) => {
        messages.push(payload);
        console.log(messages);
    })

    return (
        <div>
            <div>
                <Container maxWidth="sm" className={styles.container}>
                    <Paper className={styles.paper} elevation={3}>
                        <form className={styles.form} onSubmit={sendMessage}>
                            <Input variant="contained" name="message" label="Enter Message" handleChange={handleChange} type="text" id="message"/>
                            <IconButton type="submit">
                                <Send/>
                            </IconButton>
                        </form>
                    </Paper>
                </Container>
            </div>
        </div>
        
    )
}

export default Chat
