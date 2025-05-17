import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Ddetail.css';

const DataDetail = () => {
  const [data, setData] = useState([]);
  const { datasetId } = useParams();

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
  }, [datasetId]);
  const Ndata = data.filter(
    (item) => String(item.datasetId) === String(datasetId)
  );
  //데이터 받아오는 부분 정의
  const titles = Ndata.map((item) => item.title ?? 'None');
  const category = Ndata.map((item) => item.datasetTheme?.theme ?? 'None');
  const descriptions = Ndata.map((item) => item.description ?? 'None');
  const organization = Ndata.map((item) => item.organization ?? 'None');
  const year = Ndata.map((item) => item.datasetTheme?.dataYear ?? 'None');
  const download = Ndata.map((item) => item.download ?? 'None');
  const views = Ndata.map((item) => item.view ?? 'None');
  return (
    <div key={datasetId} className="data-detail-container">
      {/* 제목 영역 */}
      <p style={{ fontSize: '28px', padding: '10px' }}>데이터 상세</p>
      <div className="data-header">
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', padding: '30px' }}>
          {titles}
        </h1>
        <div>
          <p style={{ fontSize: '20px', marginLeft: '30px' }}>{descriptions}</p>
        </div>
        <div className="button-container">
          <div style={{ alignContent: 'center', paddingLeft: '20px' }}>
            <button className="csv-button">CSV</button>
            <span style={{ marginLeft: '20px', fontSize: '20px' }}>
              {titles}
            </span>
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
              <td>{organization}</td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>{category}</td>
              <th>확장자</th>
              <td>CSV</td>
              {/* <th>제공연도</th>
              <td>{year}</td> */}
            </tr>
            <tr>
              {/* <th>전체 행</th>
              <td>1000</td> */}
            </tr>
            <tr>
              <th>조회수</th>
              <td>{views}</td>
              <th>다운로드 수</th>
              <td>{download}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDetail;
