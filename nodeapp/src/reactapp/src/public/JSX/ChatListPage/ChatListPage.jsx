import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../CSS/ChatListPage.css';
import '../../CSS/FilteredRoom.css';
import RoomModal from './RoomModal';
import PasswordModal from './PasswordModal';

export default function ChatListPage() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const SERVER_URL = 'http://43.203.141.146:5000';

    useEffect(() => {
        // Fetch the list of rooms
        async function fetchRooms() {
            try {

                const response = await fetch(`${SERVER_URL}/rooms`);

                const data = await response.json();
                console.log("response:", response);
                console.log("data:" ,data);
                setRooms(data);
                setFilteredRooms(data.filter(room => !room.isPrivate));
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        }
        fetchRooms();
    }, []);

    // Handle room selection
    function handleSelectRoom(room) {
        room.isPrivate ? openPasswordModal(room) : navigateToRoom(room);
    }

    // Open the password modal
    function openPasswordModal(room) {
        setSelectedRoom(room);
        setIsPasswordModalOpen(true);
    }

    // Navigate to the chat room
    function navigateToRoom(room) {
        if (room.count < room.maxCount) {
            navigate(`/chatPage/${room.name}`, {
                state: { roomName: room.name, nickName: location.state?.nickName }
            });
        } else {
            alert('방이 꽉 찼습니다.');
        }
    }

    // Handle password submission
    const handlePasswordSubmit = async (enteredPassword) => {
        if (selectedRoom?.password === enteredPassword) {
            setIsPasswordModalOpen(false);
            navigateToRoom(selectedRoom);
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    // Handle adding a new room
    const handleAddRoom = async (newRoom) => {
        const room = {
            id : '',
            name: newRoom.name,
            count: newRoom.count,
            maxCount: newRoom.maxCount,
            password: newRoom.password || '', // 비밀번호가 없으면 빈 문자열로 설정
            isPrivate: newRoom.isPrivate,
            ownerId: '', // 서버에서는 ownerID가 필요하지만, 클라이언트에서는 제공하지 않음
            nickName: newRoom.ownerNickname // 서버의 'ownerNickname'과 일치
        };

        console.log("room:", room); 
        try {
            const response = await fetch(`${SERVER_URL}/add_room`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(room)
            });

            // const data = await response.json();
            // console.log("data1: ", data);
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            setRooms(prevRooms => [...prevRooms, room]);
            if (!room.isPrivate || searchQuery && room.name.toLowerCase().includes(searchQuery)) {
                setFilteredRooms(prevRooms => [...prevRooms, room]);
            }

            // alert('방이 성공적으로 생성되었습니다.');
            return true;
        } catch (error) {
            console.error('Failed to add room', error);
            alert('방 생성에 실패했습니다.');
            return false;
        }
    };

    // Handle search query change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredRooms(rooms.filter(room =>
            (!room.isPrivate && room.name.toLowerCase().includes(query)) ||
            (room.isPrivate && room.name.toLowerCase() === query)
        ));
    };

    return (
        <div className="chatListPage">
            <div className="room-list-section">
                <h2>채팅방 목록</h2>
                <div className="search-section">
                    <input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="방 제목 검색"
                        className="search-input"
                    />
                </div>
                <div className="room-list">
                    {filteredRooms.map((room) => (
                        <div
                            key={room.name}
                            onClick={() => handleSelectRoom(room)}
                            className={`room ${room.count >= room.maxCount ? 'full' : ''}`}
                        >
                            <h3>{room.name}</h3>
                            <p>{room.isPrivate && <span className="lock-icon">🔒</span>} {room.count}/{room.maxCount}, {room.count}명 접속중</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="add-room-section">
                {/* 버튼을 클릭하면 setIsModalOpen(true)가 실행된다. */}
                <button onClick={() => setIsModalOpen(true)}>방 만들기</button>
            </div>

            {isModalOpen && (
                <RoomModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddRoom}
                />
            )}

            {isPasswordModalOpen && (
                <PasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                    onSubmit={handlePasswordSubmit}
                />
            )}
        </div>
    );
}
