import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginsPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    script.onload = () => {
      window.Kakao.init("c76f70704a44abdbf1fc26569b1766a2");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (response) => {
            setUserInfo(response);
            console.log("Kakao User Info:", response);
            // 로그인 후에 필요한 작업을 수행하세요.
            // 예: 다른 페이지로 리다이렉션하거나 상태를 유지합니다.
            navigate("/dashboard"); // 페이지 전환
          },
          fail: (error) => {
            console.error("Failed to get Kakao user info", error);
          },
        });
      },
      fail: (error) => {
        console.error("Kakao login failed", error);
      },
    });
  };

  return (
    <div>
      {userInfo ? (
        <div>
          {userInfo.properties && userInfo.properties.nickname ? (
            <p>환영합니다, {userInfo.properties.nickname}님!</p>
          ) : (
            <p>환영합니다, 카카오 사용자님!</p>
          )}
        </div>
      ) : (
        <button onClick={handleKakaoLogin}>카카오톡 로그인</button>
      )}
    </div>
  );
};

export default LoginsPage;
