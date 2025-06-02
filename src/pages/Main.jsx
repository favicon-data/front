import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Main.css';

import Green from '../components/GreenArea.jsx';
import climate_icon from '../components/images/climate2.png';
import disease_icon from '../components/images/disease2.png';
import environ_icon from '../components/images/environ.png';
import Logout_modal from '../components/Logout_modal.jsx';
import GptClimateAnalyzer from '../components/gpt.jsx';

const Main = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [gptResult, setGptResult] = useState(''); // GPT 답변 상태

  // 엔터키 처리 함수
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userPrompt.trim()) setSubmittedPrompt(userPrompt);
    }
  };
  const handleInputFocus = () => {
    if (gptResult) setUserPrompt('');
  };

  return (
    <>
      <div className="bigwrapper">
        <div className="secondbox">
          <h2 className="title">무엇이든 물어보세요</h2>
          <div className="categorybox">
            {/* <Link to="/list"> */}
            <div className="box box1">
              <img src={climate_icon} alt="기후" />
              <p>기후</p>
            </div>
            {/* </Link> */}
            <div className="box box2">
              <img src={environ_icon} alt="환경" />
              <p>환경</p>
            </div>
            <div className="box box3">
              <img src={disease_icon} alt="질병" />
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
            <textarea
              className="chatplace"
              placeholder="검색어를 입력해주세요"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
            />
          </div>
          {/* GPT 답변 영역 */}
          <div className="gptRes">
            <GptClimateAnalyzer
              jsonData={submittedPrompt}
              onResult={setGptResult}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
