// import { React, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import '../styles/Ddetail.css';

// const API_BASE_URL = 'http://54.180.238.119:8080';

// const DataDetail = () => {
//   const [data, setData] = useState([]);
//   const { datasetId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`${API_BASE_URL}/data-set`);
//       const json = await response.json();
//       if (json.status === 'error') {
//         throw new Error('데이터 가져오기 실패');
//       }
//       setData(json.data);
//     };
//     fetchData();
//   }, [datasetId]);

//   const Ndata = data.filter(
//     (item) => String(item.datasetId) === String(datasetId)
//   );

//   // 데이터 받아오는 부분 정의
//   const titles = Ndata.map((item) => item.title ?? 'None');
//   const category = Ndata.map((item) => item.datasetTheme?.theme ?? 'None');
//   const descriptions = Ndata.map((item) => item.description ?? 'None');
//   const organization = Ndata.map((item) => item.organization ?? 'None');
//   const year = Ndata.map((item) => item.datasetTheme?.dataYear ?? 'None');
//   const download = Ndata.map((item) => item.download ?? 'None');
//   const views = Ndata.map((item) => item.view ?? 'None');
//   const updateDate = Ndata.map((item) => item.updateDate ?? 'None');

//   // 다운로드 버튼 클릭 시 CSV 다운로드
//   const handleDownload = async () => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/data-set/download/${datasetId}`,
//         {
//           method: 'GET',
//         }
//       );
//       if (!response.ok) {
//         throw new Error('다운로드 실패');
//       }
//       const blob = await response.blob();
//       // 파일명 추출 (Content-Disposition 헤더에서)
//       let filename = 'dataset.csv';
//       const disposition = response.headers.get('Content-Disposition');
//       if (disposition && disposition.indexOf('filename=') !== -1) {
//         filename = decodeURIComponent(
//           disposition.split('filename=')[1].replace(/['"]/g, '')
//         );
//       }
//       // 파일 다운로드 처리
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', filename);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       alert('CSV 다운로드에 실패했습니다.');
//     }
//   };
// //북마크 기능
//   const [loading, setLoading] = useState(false);
//   const { fetchBookmarkList } = useOutletContext<OutletContextType>();

//   const handleAddBookmark = async (
//     datasetId: string,
//     onSuccess?: () => void
//   ) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/scrap/${datasetId}`, {
//         method: 'POST',
//         credentials: 'include', // 세션/쿠키 인증 필요시
//         // headers: { 'Authorization': `Bearer ${token}` }, // 토큰 인증 필요시
//       });
//       if (!response.ok) throw new Error('북마크 추가 실패');
//       alert('북마크에 추가되었습니다!');
//       fetchBookmarkList(); // 북마크 리스트 즉시 새로고침
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       setError('북마크 추가 중 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div key={datasetId} className="data-detail-container">
//       {/* 제목 영역 */}
//       <p
//         style={{
//           fontSize: '24px',
//           padding: '20px 0 20px 0px',
//           fontWeight: 'bold',
//         }}
//       >
//         데이터 상세
//       </p>
//       <div className="data-header">
//         <h1 style={{ fontSize: '30px', fontWeight: 'bold', padding: '30px' }}>
//           {titles}
//         </h1>
//         <div>
//           <p style={{ fontSize: '20px', marginLeft: '30px' }}>{descriptions}</p>
//         </div>
//         <div className="button-container">
//           <div style={{ alignContent: 'center', paddingLeft: '20px' }}>
//             <button className="csv-button">CSV</button>
//             <span style={{ marginLeft: '20px', fontSize: '20px' }}>
//               {titles}
//             </span>
//           </div>
//           <div
//             className="buttonWrap"
//             style={{ display: 'flex', alignItems: 'center' }}
//           >
//             <div style={{ alignContent: 'center', paddingRight: '20px' }}>
//               <button
//                 className="download-button"
//                 onClick={handleAddBookmark}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <span className="download-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     style={{ verticalAlign: 'middle' }}
//                   >
//                     <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
//                   </svg>
//                 </span>{' '}
//                 &nbsp;북마크
//               </button>
//             </div>
//             <div>
//               <button className="download-button" onClick={handleDownload}>
//                 <span className="download-icon">⬇</span> 다운로드
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 파일데이터 정보 테이블 */}
//       <div className="data-table-section">
//         <h2>파일데이터 정보</h2>
//         <table className="data-table">
//           <tbody>
//             <tr>
//               <th>데이터명</th>
//               <td>{titles}</td>
//               <th>기관</th>
//               <td>{organization}</td>
//             </tr>
//             <tr>
//               <th>카테고리</th>
//               <td>{category}</td>
//               <th>확장자</th>
//               <td>CSV</td>
//             </tr>
//             <tr>
//               {/* <th>전체 행</th>
//               <td>1000</td> */}
//             </tr>
//             <tr>
//               {/* <th>조회수</th>
//               <td>{views}</td> */}
//               <th>업데이트</th>
//               <td>{updateDate}</td>
//               <th>다운로드 수</th>
//               <td>{download}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DataDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import '../styles/Ddetail.css';

// 필요시 타입 명시
// import type { OutletContextType } from '../types/OutletContextType';

const API_BASE_URL = 'http://54.180.238.119:8080';

const DataDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { datasetId } = useParams();
  // 타입스크립트라면 useOutletContext<OutletContextType>()
  const { fetchBookmarkList } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/data-set`);
      const json = await response.json();
      if (json.status === 'error') {
        throw new Error('데이터 가져오기 실패');
      }
      setData(json.data);
    };
    fetchData();
  }, [datasetId]);

  const Ndata = data.filter(
    (item) => String(item.datasetId) === String(datasetId)
  );

  // 데이터 받아오는 부분 정의
  const titles = Ndata.map((item) => item.title ?? 'None');
  const category = Ndata.map((item) => item.datasetTheme?.theme ?? 'None');
  const descriptions = Ndata.map((item) => item.description ?? 'None');
  const organization = Ndata.map((item) => item.organization ?? 'None');
  const year = Ndata.map((item) => item.datasetTheme?.dataYear ?? 'None');
  const download = Ndata.map((item) => item.download ?? 'None');
  const views = Ndata.map((item) => item.view ?? 'None');
  const updateDate = Ndata.map((item) => item.updateDate ?? 'None');

  // 다운로드 버튼 클릭 시 CSV 다운로드
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/data-set/download/${datasetId}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error('다운로드 실패');
      }
      const blob = await response.blob();
      // 파일명 추출 (Content-Disposition 헤더에서)
      let filename = 'dataset.csv';
      const disposition = response.headers.get('Content-Disposition');
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = decodeURIComponent(
          disposition.split('filename=')[1].replace(/['"]/g, '')
        );
      }
      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('CSV 다운로드에 실패했습니다.');
    }
  };

  // 북마크 추가 기능
  const handleAddBookmark = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/users/scrap/${datasetId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('북마크 추가 실패');
      alert('북마크에 추가되었습니다!');
      if (fetchBookmarkList) fetchBookmarkList();
    } catch (err) {
      setError('북마크 추가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={datasetId} className="data-detail-container">
      {/* 제목 영역 */}
      <p
        style={{
          fontSize: '24px',
          padding: '20px 0 20px 0px',
          fontWeight: 'bold',
        }}
      >
        데이터 상세
      </p>
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
          <div
            className="buttonWrap"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ alignContent: 'center', paddingRight: '20px' }}>
              <button
                className="download-button"
                onClick={handleAddBookmark}
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="download-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                &nbsp;{loading ? '추가 중...' : '북마크'}
              </button>
              {error && (
                <div
                  style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}
                >
                  {error}
                </div>
              )}
            </div>
            <div>
              <button className="download-button" onClick={handleDownload}>
                <span className="download-icon">⬇</span> 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 파일데이터 정보 테이블 */}
      <div className="data-table-section">
        <h2>파일데이터 정보</h2>
        <table className="data-table">
          <tbody>
            <tr>
              <th>데이터명</th>
              <td>{titles}</td>
              <th>기관</th>
              <td>{organization}</td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>{category}</td>
              <th>확장자</th>
              <td>CSV</td>
            </tr>
            <tr>
              {/* <th>전체 행</th>
              <td>1000</td> */}
            </tr>
            <tr>
              {/* <th>조회수</th>
              <td>{views}</td> */}
              <th>업데이트</th>
              <td>{updateDate}</td>
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
