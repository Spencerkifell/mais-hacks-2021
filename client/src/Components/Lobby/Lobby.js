import React, {useState, useEffect} from 'react'
function Lobby({currentRoom}) {
    return (
        <div>
            <h1>Current Room: {currentRoom}</h1>
        </div>
    )
}

export default Lobby