import React, {useState, useEffect, useContext} from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import Chat from './Chat.js';

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
`;
const StyledHeader = styled.h1`

`;

class Lobby extends React.Component {
    render (){
        var currentUser = localStorage.getItem('name');
        console.log(this.props.users);
        return (
        <StyledDiv>
            <StyledHeader>{this.props.roomName}</StyledHeader>
            <h1>Current Game: {this.props.roomName}</h1>
            <h2>Room Id: {this.props.id}</h2>
            <h2>Current User: {currentUser}</h2>
            <Chat currentUser/>
        </StyledDiv>
        )
    }
}

export default Lobby