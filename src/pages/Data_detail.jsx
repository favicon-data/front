import { React, useState, useEffect } from 'react';
import './Ddetail.css';

const DataDetail = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://54.180.238.119:8080/data-set');
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    fetchData();
  }, []);
  const titles = data.map((item) => item.title);
  const category = data.map((item) => item.datasetTheme?.theme);
  const descriptions = data.map((item) => item.description);
  return (
    <div key={data.datasetId} className="data-detail-container">
      {/* 제목 영역 */}
      <p style={{ fontSize: '28px', padding: '10px' }}>데이터 상세</p>
      <div className="data-header">
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>{data.title}</h1>
        <div style={{ height: '136px' }}>
          <p>{descriptions}</p>
        </div>
        <div className="button-container">
          <div style={{ alignContent: 'center', paddingLeft: '20px' }}>
            <button className="csv-button">CSV</button>
            <span style={{ marginLeft: '20px' }}>{titles}</span>
          </div>
          <div style={{ alignContent: 'center', paddingRight: '20px' }}>
            <button className="download-button">
              <span className="download-icon">⬇</span> 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 파일데이터 정보 테이블 */}
      <div className="data-table-section">
        <h2>파일데이터 정보</h2>
        <table className="data-table">
          <tbody>
            <tr>
              <th>파일데이터명</th>
              <td>{titles}</td>
              <th>기관</th>
              <td>기상청</td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>{category}</td>
              <th>제공연도</th>
              <td>2025</td>
            </tr>
            <tr>
              <th>확장자</th>
              <td>CSV</td>
              <th>전체 행</th>
              <td>1000</td>
            </tr>
            <tr>
              <th>조회수</th>
              <td>500</td>
              <th>다운로드 수</th>
              <td>300</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDetail;
