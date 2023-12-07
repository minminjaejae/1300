import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginsPage from "./LoginsPage";
import "./Logins.css";

const Logins = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 성공 시
    if (username === "1300k" && password === "1300k") {
      console.log("로그인 성공");
      setIsLoggedIn(true);
      // 리다이렉트
      navigate("/dashboard");
    } else {
      alert("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="container">
      {
        !isLoggedIn ? (
          <>
            <h2 className="logo">1300k</h2>
            <p className="subtitle">the number 13 symbolizing circulation</p>
            <p className="input-group p">아이디</p>
            <input
              className="input-group"
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="input-group p">비밀번호</p>
            <input
              className="input-group"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <button onClick={handleLogin} className="button">
              로그인
            </button>
            <LoginsPage />
          </>
        ) : null /* isLoggedIn이 true일 때는 로그인 폼을 숨김 */
      }
    </div>
  );
};

export default Logins;
