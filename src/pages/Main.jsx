import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Main.css';

import Green from '../components/GreenArea.jsx';

import climate_icon from '../components/images/climate2.png';
import disease_icon from '../components/images/disease2.png';
import environ_icon from '../components/images/environ.png';
import Logout_modal from '../components/Logout_modal.jsx';

const Main = () => {
  const [userPrompt, setUserPrompt] = useState(''); // 사용자 입력 상태
  const [response, setResponse] = useState('');
  const [toggle, istoggleClick] = useState(false); // 토글 상태

  const navigate = useNavigate();
  const handleToggle = () => {
    istoggleClick(!toggle);
  };
  //프롬프트 gpt 입력코드
  const handleSubmit = async () => {
    if (toggle) {
      if (!userPrompt.trim()) return; // 빈 입력 방지
      try {
        const res = await axios.post('http://localhost:3001/gptTest', {
          userPrompt: userPrompt,
        });
        console.log(res.data);
        setResponse(res.data);
      } catch (error) {
        console.error('Error:', error);
        setResponse('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      console.log('favicon submit');
      // 일단 목록 페이지로 리다이렉션
      navigate('/list');
    }
  };

  return (
    <>
      <div className="bigwrapper">
        <div className="firstbox">
          {/* 초록색 부분 임포트  */}
          <Green />
        </div>
        <div className="secondbox">
          <h2 className="title">Data Category</h2>
          <div className="categorybox">
            <Link to="/list">
              <div className="box box1">
                <img src={climate_icon} />
                <p>기후</p>
              </div>
            </Link>
            <div className="box box2">
              <img src={environ_icon} />
              <p>환경</p>
            </div>
            <div className="box box3">
              <img src={disease_icon} />
              <p>질병</p>
            </div>
          </div>
          <div
            className="chatbox"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* 토글 기능 삭제 */}
            {/* <div className="toggle">
              <p
                style={{ color: toggle ? 'lightgray' : 'black' }}
                onClick={handleToggle}
              >
                Favicon
              </p>
              <div
                style={{
                  width: '70px',
                  height: '40px',
                  boxShadow: '0.5px 0.5px gray',
                  borderRadius: '40px',
                }}
              >
                <div
                  className={`toggleB${toggle ? 'on' : 'off'}`}
                  onClick={handleToggle}
                />
              </div>
              <p
                style={{ color: toggle ? 'black' : 'lightgray' }}
                onClick={handleToggle}
              >
                AI Chat
              </p>
            </div> */}
            <textarea
              className="chatplace"
              placeholder="검색어를 입력해주세요"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button className="send-button" onClick={handleSubmit}>
              &gt;
            </button>
          </div>
          {response && (
            <div className="gpt-response">
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
