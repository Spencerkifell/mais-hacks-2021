import React, {useState, useEffect, useContext} from 'react'
class Lobby extends React.Component {
    render (){
        var currentUser = localStorage.getItem('name');
        return (
        <div>
            <h1>Current Game: {this.props.roomName}</h1>
            <h2>Room Id: {this.props.id}</h2>
            <h2>Current User: {currentUser}</h2>
        </div>
        )
    }
}

export default Lobby