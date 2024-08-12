import React from "react";

function ChatRoom({roomName, participants, onSelect}) {
    const maxParticipants = 3;

    return (
        <div
            onClick={participants.length < maxParticipants ? onSelect : null}
            className={`chat-room ${participants.length >= maxParticipants ? 'full' : ''}`}
        >
            <h3>{roomName}</h3>
            <p>Participants : {participants.length}/{maxParticipants}</p>
        </div>
    )
}

export default ChatRoom;