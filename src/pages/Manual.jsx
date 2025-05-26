import React from 'react';
import '../guide.css';
import image1 from '../components/images/newCap.png';
const Manual = () => {
  return (
    <div className="container">
      <h1 className="page-title">favicon 이용 가이드</h1>

      <div className="speech-bubble">
        Step 1. 비교하고 싶은 카테고리를 1~2개를 선택하세요.
        <br />
        Step 2. 지역과 기간을 설정하세요.
        <br />
        Step 3. [분석] 버튼을 클릭하면 결과가 시각화됩니다.
      </div>

      {/* 카테고리 부분을 스크린샷으로 대체 */}
      <div className="screenshot-container">
        <img
          src={image1}
          alt="카테고리 스크린샷"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>

      <div className="result-bubble">
        ChatGPT
        <br />
        데이터 분석 결과를
        <br />
        나타냅니다
      </div>
    </div>
  );
};

export default Manual;
