import logo from './logo.svg';
import './App.css';
import MainPage from './public/JSX/MainPage/MainPage';
// import ChatListPage from './public/JSX/ChatListPage/ChatListPage';
import ChatPage from './public/JSX/ChatPage/ChatPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatListPage2 from './public/JSX/ChatListPage/ChatListPage2';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/chatListPage2" element={<ChatListPage2/>} />
          <Route path="/chatPage/:room" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

