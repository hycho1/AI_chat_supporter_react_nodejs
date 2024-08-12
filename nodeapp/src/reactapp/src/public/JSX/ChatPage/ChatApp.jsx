import React, {useState} from "react";
import ChatRoomList from "./ChatRoomList";

function ChatApp() {
    const [rooms, setRooms] = useState([
        { roomName: 'Room 1', participants : [], messages: []},
        { roomName: 'Room 2', participants : [], messages: []},
        { roomName: 'Room 3', participants : [], messages: []},
        { roomName: 'Room 4', participants : [], messages: []},
        { roomName: 'Room 5', participants : [], messages: []},
        { roomName: 'Room 6', participants : [], messages: []},
    ]);

    const [currentRoom, setCurrentRoom] = useState(null);

    const handleRoomSelect = (roomName) => {
        const selectedRoom = rooms.find((room) => room.roomName === roomName);
        if (selectedRoom.participants.length < 3) {
            setCurrentRoom(selectedRoom);
        }
    };

    return (
        <div className="chat-app">
            <ChatRoomList rooms={rooms} onSelectRoom={handleRoomSelect} />
        </div>
    )
}

export default ChatApp;