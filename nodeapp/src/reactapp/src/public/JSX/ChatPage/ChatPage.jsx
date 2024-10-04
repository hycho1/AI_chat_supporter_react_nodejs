import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../../CSS/ChatPage.css';
import ChatFrame from './ChatFrame';
import LogFrame from './LogFrame';
import Chatlistpage from '../ChatListPage/ChatListPage';

export default function ChatPage() {
    const [isSocketConnected, setIsSocketConnected] = useState(false); // 소켓 연결 여부
    const [selectedRoom, setSelectedRoom] = useState(null); // 선택된 방
    const [isPrivate, setIsPrivate] = useState(false); // 초기 비공개 여부 설정
    const [roomCount, setRoomCount] = useState(0); // 현재 방 인원 수
    const [roomName, setRoomName] = useState(null); // 방 이름
    const [maxCount, setMaxCount] = useState(2); // 초기 최대 인원 설정
    const [password, setPassword] = useState(''); // 초기 비밀번호 설정

    const location = useLocation();
    const UserName = location.state?.nickName;

    let socket = useRef(null); // 소켓 연결을 위한 ref

    const handleSelectRoom = (room) => {
        console.log("handleSelectRoom :" , room);
        console.log("handleSelectRoom :" , room.name);

        setSelectedRoom(room);
        setRoomName(room.name);
        setIsPrivate(room.isPrivate);
        setMaxCount(room.maxCount);
        setPassword(room.password);
    };

    return (
        <div className="chatPage">
            <Chatlistpage
                onSelectedRoom={handleSelectRoom}
                UserName={UserName}
                socket={socket}
                roomName={roomName}
                setRoomName={setRoomName}
                password={password}
                setPassword={setPassword}
                isPrivate={isPrivate}
                setIsPrivate={setIsPrivate}
                maxCount={maxCount}
                setMaxCount={setMaxCount}
                setIsSocketConnected={setIsSocketConnected}
                isSocketConnected={isSocketConnected}
            />

            <div className="chatFrameContainer">
                {/* 방이 선택되지 않은 경우 */}
                {!selectedRoom ? (
                    <div className="noRoomSelected">
                        <div className="empty-chat">
                            <div className="chat-icon">
                                {/* 말풍선 SVG 아이콘 */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-1 4A8.5 8.5 0 0 1 3 11.5a8.38 8.38 0 0 1 1-4 8.5 8.5 0 0 1 16 0 8.38 8.38 0 0 1 1 4z" />
                                    <line x1="12" y1="12" x2="12" y2="12" />
                                    <line x1="8" y1="12" x2="8" y2="12" />
                                    <line x1="16" y1="12" x2="16" y2="12" />
                                </svg>
                            </div>
                            <p>여러 사람들과 소통해 보세요.</p>
                        </div>
                    </div>
                ) : (
                    // 방이 선택된 경우 ChatFrame 컴포넌트 표시
                    <ChatFrame
                        UserName={UserName}
                        location={location}
                        room={selectedRoom}
                        socket={socket}
                        roomCount={roomCount}
                        setRoomCount={setRoomCount}
                        roomName={roomName}
                        setRoomName={setRoomName}
                        password={password}
                        setPassword={setPassword}
                        isPrivate={isPrivate}
                        setIsPrivate={setIsPrivate}
                        maxCount={maxCount}
                        setMaxCount={setMaxCount}
                        setIsSocketConnected={setIsSocketConnected}
                        // isOwner={isOwner}
                    />
                )}
            </div>
            <LogFrame />
        </div>
    );
}
