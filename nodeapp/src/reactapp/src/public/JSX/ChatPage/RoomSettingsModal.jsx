import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../CSS/RoomSettingsModal.css';

const SERVER_URL = 'http://localhost:5001';

export default function RoomSettingsModal({ isOpen, onClose, roomDetails, roomCount, onDelete, socket, isSocketConnected }) {
    const [roomName, setRoomName] = useState(roomDetails?.name || '');
    const [maxCount, setMaxCount] = useState(roomDetails?.maxCount || 10);
    const [password, setPassword] = useState(roomDetails?.password || '');
    const [isPrivate, setIsPrivate] = useState(roomDetails?.isPrivate || false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [count, setCount] = useState(roomDetails?.count || 0);
    const navigate = useNavigate();

    useEffect(() => {
        if (roomDetails) {
            setRoomName(roomDetails.name);
            setMaxCount(roomDetails.maxCount);
            setPassword(roomDetails.password);
            setIsPrivate(roomDetails.isPrivate);
            setCount(roomDetails.count);
        }
    }, [roomDetails]);

    console.log("roomDetails:", roomDetails.ownerNickname);
    console.log("현재방 정보", roomDetails);
    console.log("현재 인원수", roomCount);
    console.log("현재 최대인원수", maxCount);


    const handleSave = () => {
        if (maxCount < 2 || maxCount > 10) {
            alert('최대 인원수는 2에서 10 사이여야 합니다.');
            return;
        }

        if ( roomCount > maxCount) {
            alert(`현재 방에 ${roomCount}명이 접속해 있습니다. 최대 인원수를 ${roomCount}명보다 작게 설정할 수 없습니다.`);
            return;
        }
    
        setIsSaving(true);
    
        // 서버로 방 정보 업데이트 요청
        socket.current.emit('update_room', {
            originalName: roomDetails.name,
            updatedName: roomDetails.name,  // roomName은 변경되지 않음
            updatedMaxCount: maxCount,
            updatedPassword: password,
            updatedIsPrivate: isPrivate,
            ownerNickname: roomDetails.ownerNickname
        });
    
        // 방 정보 업데이트 요청 후 UI 처리를 진행 (성공 여부는 별도 처리 없이 바로)
        setIsSaving(false);
        alert('방 정보가 업데이트되었습니다.');
        onClose();
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 방을 삭제하시겠습니까?")) {
            setIsDeleting(true);
            console.log("roomName", roomName);

            // 소켓을 통한 방 삭제 요청
            socket.current.emit('delete_room', roomName);

            // 삭제 요청 후 바로 ChatListPage로 이동
            navigate('/ChatListPage', {
                state: {
                    nickName: roomDetails.nickName,  // 삭제 후 닉네임 정보 전달
                },
            });
            setIsDeleting(false);  // 삭제 상태 리셋
        }
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>방 설정</h2>
                    <label>
                        방 이름:
                        <input
                            type="text"
                            value={roomName}
                            disabled={true}  // 방 이름은 변경 불가
                        />
                    </label>
                    <label>
                        최대 인원: {maxCount}
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={maxCount}
                            onChange={(e) => setMaxCount(Number(e.target.value))}
                            className="slider"
                            disabled={isSaving || isDeleting}
                        />
                    </label>
                    <label>
                        비밀번호:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!isPrivate || isSaving || isDeleting}  // 비공개가 아닐 때 비밀번호 필드 비활성화
                        />
                    </label>
                    <label>
                        비공개:
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            disabled={isSaving || isDeleting}
                        />
                    </label>
                    <div className="modal-buttons">
                        <button onClick={handleSave} disabled={isSaving || isDeleting}>
                            {isSaving ? '저장 중...' : '저장'}
                        </button>
                        <button onClick={onClose} disabled={isSaving || isDeleting}>닫기</button>
                        <button onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? '삭제 중...' : '방 삭제'}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
