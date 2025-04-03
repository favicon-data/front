import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user_icon from '../components/images/user-icon.png';
import logout_icon from '../components/images/logout.png';
import Logout_modal from '../components/Logout_modal.jsx';

import logo from '../components/images/favicon_logo.png';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [outModal, setoutModal] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      const response = await fetch('http://54.180.238.119:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
        setIsLoggedIn(true);
        alert(data.message);

        // 로그인 성공 시 메인 화면으로 이동
        navigate('/main');
      } else {
        const errorData = await response.json();
        alert('로그인 실패: ' + errorData.message);
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error);
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
    setoutModal(true);
  };

  // 모달창을 닫음
  const handleCloseModal = () => {
    setoutModal(false); // 모달창을 닫음
  };

  // 회원가입 처리
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div className="profile-box" style={{ textAlign: 'center' }}>
          <div>
            <img
              src={user_icon}
              alt="User"
              style={{ width: '100px', borderRadius: '50%' }}
            />
            <h2 style={{ marginTop: '20px' }}>{userName} 님</h2>
            <button
              onClick={handleLogout}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '10px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              로그아웃
              <img
                src={logout_icon}
                alt="Logout Icon"
                style={{ marginLeft: '10px', width: '20px' }}
              />
            </button>
          </div>
          <div style={{ marginTop: '30px' }}>
            <button
              style={{
                padding: '10px 20px',
                marginRight: '10px',
                borderRadius: '10px',
                backgroundColor: '#2196F3',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              업로드 수 N
            </button>
            <button
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                backgroundColor: '#FF5722',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              개인정보 수정
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: '188px', marginBottom: '20px' }}
            />
          </div>
          <div className="login-box" style={{ textAlign: 'center' }}>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="fail-message" style={{ color: '#ff0000' }}></div>
            <div className="button-wrap">
              <button
                onClick={handleLogin}
                style={{
                  width: '816px',
                  height: '80px',
                  fontSize: '26px',
                  backgroundColor: ' #597445',
                  color: '#fff ',
                  borderRadius: '5px ',
                  marginTop: '85px',
                }}
              >
                로그인
              </button>
            </div>
          </div>
          <button
            onClick={handleSignup}
            style={{
              width: '1000px',
              height: '80px',
              fontSize: '26px',
              backgroundColor: '#ffffff',

              borderRadius: '30px',
              border: '2px solid #597445',
              marginTop: '40px',
            }}
          >
            회원가입
          </button>
        </div>
      )}
      {outModal && (
        <Logout_modal
          onClose={handleCloseModal}
          className={outModal ? 'active' : ''}
        />
      )}
    </div>
  );
};

export default Login;
