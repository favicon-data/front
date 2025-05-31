// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import user_icon from '../components/images/user-icon.png';
// import logout_icon from '../components/images/logout.png';
// import Logout_modal from '../components/Logout_modal.jsx';

// import logo from '../components/images/logo.png';

// // const API_BASE_URL = "http://localhost:8082"
// const API_BASE_URL = 'http://54.180.238.119:8080';

// const Login = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [outModal, setoutModal] = useState(false);

//   const [email, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   // 로그인 처리 함수
//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const datas = await response.json();

//       if (datas.status === 'error') {
//         throw new Error('로그인 실패');
//       } else {
//         const data = datas.data;
//         setUserName(data.email);
//         setIsLoggedIn(true);
//         // alert(data.message);

//         // 로그인 성공 시 메인 화면으로 이동
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('로그인 요청 에러:', error);
//     }
//   };

//   // 로그아웃 처리 함수
//   const handleLogout = () => {
//     setUserName('');
//     setIsLoggedIn(false);
//     setoutModal(true);
//   };

//   // 모달창을 닫음
//   const handleCloseModal = () => {
//     setoutModal(false); // 모달창을 닫음
//   };

//   // 회원가입 처리
//   const handleSignup = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="login-container">
//       {isLoggedIn ? (
//         <div className="profile-box" style={{ textAlign: 'center' }}>
//           <div>
//             <img
//               src={user_icon}
//               alt="User"
//               style={{ width: '100px', borderRadius: '50%' }}
//             />
//             <h2 style={{ marginTop: '20px' }}>{userName} 님</h2>
//             <button
//               onClick={handleLogout}
//               style={{
//                 marginTop: '20px',
//                 padding: '10px 20px',
//                 fontSize: '16px',
//                 borderRadius: '10px',
//                 backgroundColor: '#4CAF50',
//                 color: '#fff',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               로그아웃
//               <img
//                 src={logout_icon}
//                 alt="Logout Icon"
//                 style={{ marginLeft: '10px', width: '20px' }}
//               />
//             </button>
//           </div>
//           <div style={{ marginTop: '30px' }}>
//             <button
//               style={{
//                 padding: '10px 20px',
//                 marginRight: '10px',
//                 borderRadius: '10px',
//                 backgroundColor: '#2196F3',
//                 color: '#fff',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               업로드 수 N
//             </button>
//             <button
//               style={{
//                 padding: '10px 20px',
//                 borderRadius: '10px',
//                 backgroundColor: '#FF5722',
//                 color: '#fff',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               개인정보 수정
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div style={{ textAlign: 'center' }}>
//           <div style={{ textAlign: 'center' }}>
//             <img
//               src={logo}
//               alt="logo"
//               style={{ width: '188px', marginBottom: '20px' }}
//             />
//           </div>
//           <div className="login-box" style={{ textAlign: 'center' }}>
//             <input
//               type="text"
//               placeholder="이메일을 입력하세요"
//               value={email}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="비밀번호를 입력하세요"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div className="fail-message" style={{ color: '#ff0000' }}></div>
//             <div className="button-wrap">
//               <button
//                 onClick={handleLogin}
//                 style={{
//                   width: '816px',
//                   height: '80px',
//                   fontSize: '26px',
//                   backgroundColor: ' #597445',
//                   color: '#fff ',
//                   borderRadius: '5px ',
//                   marginTop: '85px',
//                 }}
//               >
//                 로그인
//               </button>
//             </div>
//           </div>
//           <button
//             onClick={handleSignup}
//             style={{
//               width: '1000px',
//               height: '80px',
//               fontSize: '26px',
//               backgroundColor: '#ffffff',

//               borderRadius: '30px',
//               border: '2px solid #597445',
//               marginTop: '40px',
//             }}
//           >
//             회원가입
//           </button>
//         </div>
//       )}
//       {outModal && (
//         <Logout_modal
//           onClose={handleCloseModal}
//           className={outModal ? 'active' : ''}
//         />
//       )}
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
// import user_icon from '../components/images/user-icon.png';
// import logout_icon from '../components/images/logout.png';
import Logout_modal from '../components/Logout_modal.jsx';
import Logo from '../components/images/logo.png';

const API_BASE_URL = 'http://54.180.238.119:8080';

const Login = () => {
  const [outModal, setoutModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // RootLayout에서 전달된 상태 변경 함수
  const { setIsLoggedIn, setUserName } = useOutletContext();

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const datas = await response.json();

      if (datas.status === 'error') {
        alert('로그인 실패');
        throw new Error('로그인 실패');
      } else {
        const data = datas.data;
        // setEmail(data.email); // 사용자 메일
        setUserName(data.username);
        setIsLoggedIn(true);
        navigate('/');
        console.log(data);
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error);
    }
  };
  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/users/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setUserName(data.name);
  //       setIsLoggedIn(true);
  //       // userId와 userName을 localStorage에 저장
  //       localStorage.setItem('user', JSON.stringify({ userId: data.userId, userName: data.name }));
  //       alert(data.message);
  //     } else {
  //       const errorData = await response.json();
  //       alert('로그인 실패: ' + errorData.message);
  //     }
  //   } catch (error) {
  //     console.error('로그인 요청 에러:', error);
  //   }
  // };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
    setoutModal(true);
  };

  // 모달창 닫기
  const handleCloseModal = () => {
    setoutModal(false);
  };

  // 회원가입 이동
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      {/** 로그인 상태에 따른 UI는 RootLayout에서 처리하므로 로그인 페이지는 로그인 폼만 노출 */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: '188px', marginBottom: '20px' }}
          />
        </div>
        <div className="login-box" style={{ textAlign: 'center' }}>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                backgroundColor: ' #8aa47e',
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
      {outModal && (
        <Logout_modal
          onClose={(handleCloseModal, handleLogout)}
          className={outModal ? 'active' : ''}
        />
      )}
    </div>
  );
};

export default Login;
