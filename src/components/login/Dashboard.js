import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import MainPage from "../main/MainPage";
import "./Dashboard.css"; // Dashboard 컴포넌트에 새로운 CSS 파일을 import

const Dashboard = () => {
  // ...

  return (
    <div className="dashboard-container">
      <p>
        로그인에 성공하셨습니다.<br></br> 자신만에 서재를 채워가 보세요^^
      </p>
      <Link to="/main" className="confirm-button">
        확인
      </Link>
      <Routes>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
