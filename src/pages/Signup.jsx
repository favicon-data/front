// import React, { useState } from 'react';
// import '../Login.css';
// import axios from 'axios';

// const Signup = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordHint, setPasswordHint] = useState(true);
//   const [passwordMatch, setPasswordMatch] = useState(true);

//   const [email, setEmail] = useState('');
//   const [emailSent, setEmailSent] = useState(false);
//   const [emailMessage, setEmailMessage] = useState('');

//   const [authCode, setAuthCode] = useState('');
//   const [authMessage, setAuthMessage] = useState('');
//   const [authSuccess, setAuthSuccess] = useState(false);

//   // 비밀번호 유효성 검사
//   const validatePassword = (value) => {
//     const hasLetter = /[a-zA-Z]/.test(value);
//     const hasNumber = /\d/.test(value);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

//     if (value.length < 6) {
//       setPasswordHint(false);
//     } else {
//       const validCount = [hasLetter, hasNumber, hasSpecialChar].filter(
//         Boolean
//       ).length;
//       setPasswordHint(validCount >= 2);
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);
//     validatePassword(value);
//     if (confirmPassword !== '') {
//       setPasswordMatch(value === confirmPassword);
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const value = e.target.value;
//     setConfirmPassword(value);
//     setPasswordMatch(value === password);
//   };

//   // 이메일 입력 핸들러
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   // 인증요청 버튼 클릭
//   const handleEmailSend = async () => {
//     try {
//       const response = await axios.post(
//         'http://54.180.238.119:8080/users/email-check',
//         { email }
//       );
//       if (response.data.status === 'success') {
//         setEmailSent(true);
//         setEmailMessage('인증번호가 이메일로 전송되었습니다.');
//       } else {
//         setEmailMessage('이메일 전송에 실패했습니다.');
//       }
//     } catch (error) {
//       setEmailMessage('서버 오류가 발생했습니다.');
//     }
//   };

//   // 인증번호 입력 핸들러
//   const handleAuthCodeChange = (e) => {
//     setAuthCode(e.target.value);
//   };

//   // 인증번호 확인 버튼 클릭
//   const handleAuthCheck = async () => {
//     try {
//       const response = await axios.post(
//         'http://54.180.238.119:8080/users/code-check',
//         {
//           email,
//           code: authCode,
//         }
//       );
//       if (response.data.status === 'success') {
//         setAuthSuccess(true);
//         setAuthMessage('인증 성공!');
//       } else {
//         setAuthSuccess(false);
//         setAuthMessage('인증번호가 일치하지 않습니다.');
//       }
//     } catch (error) {
//       setAuthSuccess(false);
//       setAuthMessage('서버 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           fontSize: '40px',
//           fontWeight: 'bold',
//           textAlign: 'center',
//           marginTop: '65px',
//         }}
//       >
//         회원가입
//       </div>

//       <div className="signup_input">
//         <div className="input_wrap">
//           <div className="name">아이디</div>
//           <input
//             type="text"
//             className="input_box id"
//             placeholder="아이디 입력"
//             style={{ fontSize: '28px', marginBottom: '24px' }}
//           />

//           <div className="name">비밀번호</div>
//           <input
//             type="password"
//             className="input_box pw"
//             placeholder="비밀번호 입력"
//             value={password}
//             onChange={handlePasswordChange}
//             style={{
//               borderColor: passwordHint ? 'lightgray' : 'red',
//               fontSize: '28px',
//             }}
//           />
//           <div style={{ fontSize: '24px' }}>
//             *영문/숫자/특수문자 2가지 이상 조합(6자 이상)
//           </div>
//           {passwordHint ? (
//             <p style={{ color: '#fff' }}>none</p>
//           ) : (
//             <p style={{ color: 'red' }}>
//               비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 6자 이상
//               입력하세요.
//             </p>
//           )}

//           <div className="name">비밀번호 확인</div>
//           <input
//             type="password"
//             className="input_box pw_check"
//             placeholder="비밀번호 확인"
//             value={confirmPassword}
//             onChange={handleConfirmPasswordChange}
//             style={{ fontSize: '28px' }}
//           />
//           {password === '' || confirmPassword === '' ? (
//             <p style={{ color: 'transparent' }}>none</p>
//           ) : passwordMatch ? (
//             <p style={{ color: 'green' }}>비밀번호가 일치합니다.</p>
//           ) : (
//             <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
//           )}

//           {/* 이메일 인증 */}
//           <div className="name">이메일</div>
//           <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
//             <input
//               type="email"
//               className="input_box email"
//               placeholder="이메일 입력"
//               value={email}
//               onChange={handleEmailChange}
//               style={{ width: '1400px' }}
//             />
//             <button className="emailSend" onClick={handleEmailSend}>
//               인증요청
//             </button>
//           </div>
//           {emailMessage && (
//             <p style={{ color: emailSent ? 'green' : 'red' }}>{emailMessage}</p>
//           )}

//           <div className="name" style={{ marginTop: '24px' }}>
//             인증번호
//           </div>
//           <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
//             <input
//               type="text"
//               className="input_box auth"
//               placeholder="인증번호 확인"
//               value={authCode}
//               onChange={handleAuthCodeChange}
//               style={{ width: '1400px' }}
//             />
//             <button className="emailSend" onClick={handleAuthCheck}>
//               확인
//             </button>
//           </div>
//           {authMessage && (
//             <p style={{ color: authSuccess ? 'green' : 'red' }}>
//               {authMessage}
//             </p>
//           )}
//         </div>
//         <button
//           className="input_box submitB"
//           type="submit"
//           disabled={!passwordHint || !passwordMatch || !authSuccess}
//         >
//           가입하기
//         </button>
//       </div>
//     </>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';
import axios from 'axios';

const Signup = () => {
  const [username, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHint, setPasswordHint] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const [authCode, setAuthCode] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  const Navigate = useNavigate();
  const API_BASE_URL = 'http://54.180.238.119:8080';

  // 비밀번호 유효성 검사
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
      setPasswordHint(validCount >= 2);
    }
  };

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
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 이메일 인증 요청
  const handleEmailSend = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/email-check`, {
        email,
      });
      if (response.data.status === 'success') {
        setEmailSent(true);
        setEmailMessage('인증번호가 이메일로 전송되었습니다.');
      } else {
        setEmailMessage(response.data.message); // 서버 메시지 사용
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setEmailMessage(error.response.data.message); // 서버에서 내려온 에러 메시지
      } else {
        setEmailMessage('서버 오류가 발생했습니다.');
      }
    }
  };

  const handleAuthCodeChange = (e) => {
    setAuthCode(e.target.value);
  };

  // 인증번호 확인
  const handleAuthCheck = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/code-check`, {
        email,
        code: authCode,
      });
      if (response.data.status === 'success') {
        setAuthSuccess(true);
        setAuthMessage('인증 성공!');
      } else {
        setAuthSuccess(false);
        setAuthMessage('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setAuthSuccess(false);
      setAuthMessage('서버 오류가 발생했습니다.');
    }
  };

  // **가입하기 버튼 클릭 시 서버로 회원가입 POST 요청**
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://54.180.238.119:8080/users/register',
        {
          username,
          password,
          email,
        }
      );
      // 성공 처리 (예: 알림, 리다이렉트 등)
      alert('회원가입이 완료되었습니다!');
      Navigate('/');
      // window.location.href = '/login'; // 필요시 로그인 페이지로 이동
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
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
      <form className="signup_input" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <div className="name">아이디</div>
          <input
            type="text"
            className="input_box id"
            placeholder="아이디 입력"
            style={{ fontSize: '28px', marginBottom: '24px' }}
            value={username}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <div className="name">비밀번호</div>
          <input
            type="password"
            className="input_box pw"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
            style={{
              borderColor: passwordHint ? 'lightgray' : 'red',
              fontSize: '28px',
            }}
            required
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
            type="password"
            className="input_box pw_check"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{ fontSize: '28px' }}
            required
          />
          {password === '' || confirmPassword === '' ? (
            <p style={{ color: 'transparent' }}>none</p>
          ) : passwordMatch ? (
            <p style={{ color: 'green' }}>비밀번호가 일치합니다.</p>
          ) : (
            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
          )}

          {/* 이메일 인증 */}
          <div className="name">이메일</div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input
              type="email"
              className="input_box email"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmailChange}
              style={{ width: '1400px' }}
              required
            />
            <button
              type="button"
              className="emailSend"
              onClick={handleEmailSend}
              style={{ backgroundColor: '#597445', color: 'white' }}
            >
              인증요청
            </button>
          </div>
          {emailMessage && (
            <p style={{ color: emailSent ? 'green' : 'red' }}>{emailMessage}</p>
          )}

          <div className="name" style={{ marginTop: '24px' }}>
            인증번호
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              className="input_box auth"
              placeholder="인증번호 확인"
              value={authCode}
              onChange={handleAuthCodeChange}
              style={{ width: '1400px' }}
            />
            <button
              type="button"
              className="emailSend"
              onClick={handleAuthCheck}
              style={{ backgroundColor: '#597445', color: 'white' }}
            >
              확인
            </button>
          </div>
          {authMessage && (
            <p style={{ color: authSuccess ? 'green' : 'red' }}>
              {authMessage}
            </p>
          )}
        </div>
        <button
          className="input_box submitB"
          type="submit"
          disabled={
            !username || !passwordHint || !passwordMatch || !authSuccess
          }
        >
          가입하기
        </button>
      </form>
    </>
  );
};

export default Signup;
