import React, { useState } from 'react';
import '../Login.css';

const Signup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHint, setPasswordHint] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // 비밀번호 유효성 검사 함수
  const validatePassword = (value) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < 6) {
      setPasswordHint(false);
    } else {
      const validCount = [hasLetter, hasNumber, hasSpecialChar].filter(
        Boolean
      ).length;
      if (validCount < 2) {
        setPasswordHint(false);
      } else {
        setPasswordHint(true);
      }
    }
  };

  // 비밀번호 입력이 변경될 때 호출되는 함수
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    if (confirmPassword !== '') {
      setPasswordMatch(value === confirmPassword);
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value); // 비밀번호 확인 상태 업데이트
    setPasswordMatch(value === password); // 비밀번호와 일치하는지 확인
  };
  return (
    <>
      <div
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '65px',
        }}
      >
        회원가입
      </div>

      <div className="signup_input">
        <div className="input_wrap">
          <div className="name">아이디</div>
          <input
            type="text"
            className="input_box id"
            placeholder="아이디 입력"
            style={{ fontSize: '28px' }}
          />
          <p style={{ fontSize: '16px', color: 'red', marginBottom: '40px' }}>
            "아이디 중복 확인 칸"
          </p>
          <div className="name">비밀번호</div>
          <input
            type="text"
            className="input_box pw"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
            style={{
              borderColor: passwordHint ? 'lightgray' : 'red',
              fontSize: '28px',
            }}
          />
          <div style={{ fontSize: '24px' }}>
            *영문/숫자/특수문자 2가지 이상 조합(6자 이상)
          </div>

          {passwordHint ? (
            <p style={{ color: '#fff' }}>none</p>
          ) : (
            <p style={{ color: 'red' }}>
              비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 6자 이상
              입력하세요.
            </p>
          )}
          <div className="name">비밀번호 확인</div>
          <input
            type="text"
            className="input_box pw_check"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{ fontSize: '28px' }}
          />
          {password === '' || confirmPassword === '' ? (
            <p style={{ color: 'transparent' }}>none</p>
          ) : passwordMatch ? (
            <p style={{ color: 'green' }}>비밀번호가 일치합니다.</p>
          ) : (
            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        <button
          className="input_box submitB"
          type="submit"
          disabled={!passwordHint || !passwordMatch}
        >
          가입하기
        </button>
      </div>
    </>
  );
};

export default Signup;
