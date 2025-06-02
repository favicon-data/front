import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// const API_BASE_URL = "http://localhost:8082"
const API_BASE_URL = "http://54.180.238.119:8080"

const Green = ({ userName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/data-set/ratio`
      );
      const json = await response.json();
      if (json.status === "error") {
        throw new Error('데이터 가져오기 실패');
      }
      console.log(json.data);
      setData(json.data);
      
    };
    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          padding: '20px',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {/* 세로선 */}
        <div
          style={{
            borderLeft: '2px solid black',
            height: '100%',
            marginRight: '10px',
          }}
        />

        {/* 데이터 리스트 */}
        <div>
          <h3 style={{ marginTop: 0, fontSize: '26px' }}>Data</h3>
          <div style={{ borderLeft: '1.5px solid black' }}>
            <ul style={{ listStyleType: 'none', paddingLeft: '15px' }}>
              <li>질병 : {data.질병 * 100}% </li>
              <li>환경 : {data.환경 * 100}% </li>
              <li>기후 : {data.기후 * 100}% </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="login_in" style={{ height: '100%' }}>
        {userName ? (
          <span>{userName}</span> // 로그인 후 사용자 이름 표시
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: '#000' }}>
            <div
              className="profileimg"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50px',
                backgroundColor: 'lightgray',
                margin: '0 30px 0 30px',
              }}
            />
            로그인
          </Link> // 로그인 버튼
        )}
      </div>
    </div>
  );
};

export default Green;
