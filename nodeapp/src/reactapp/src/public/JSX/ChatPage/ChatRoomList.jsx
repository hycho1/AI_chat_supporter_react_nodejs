import React from "react";
import ChatRoom from './ChatRoom';

function ChatRoomList({rooms, onSelectRoom}) {
    return (
        <div className="rooms-list">
            {rooms.map((room, idx) => (
                <ChatRoom
                    key={idx}
                    roomName={room.roomName}
                    participants={room.participants}
                    onSelect={() => onSelectRoom(room.roomName)} 
                />
            ))}
        </div>
    )
}

export default ChatRoomList;

