import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../../CSS/MainPage.css';

export default function MainPage() {
    
    const [nickName, setNickName] = useState('');
    const navigate = useNavigate();

    const handleNickNameSubmit = () =>{
        if (nickName) {
            navigate('/chatListPage',{state:{'nickName':nickName}});
        }
    }
    


    return (
        <div className="MainPage">
            <div className="Main">
                <input type='text' name='nickName' placeholder="닉네임을 입력해주세요." onChange={(e)=>{setNickName(e.target.value)}}></input>
                <button  onClick={handleNickNameSubmit}>입장하기</button>

            </div>
        </div>
    );
}