import React from 'react';
import '../Bulletin.css';

const requestData = [
  {
    no: 10,
    category: '환경',
    description: '태양광 발전소 발전량 분절된 데이터',
    fileType: 'csv, xlsx',
    dateRange: '13.01.01 ~ 24.01.01',
    regDate: '2025.01.09',
    status: '미승인',
  },
  {
    no: 9,
    category: '환경',
    description: '야생동물 관측 수 데이터',
    fileType: 'csv',
    dateRange: '전체',
    regDate: '2025.01.05',
    status: '대기',
  },
];

function Bulletin() {
  return (
    <div className="page-wrap">
      <div className="content">
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>
          사용자 요청
        </h1>
        <div className="top-bar">
          <span className="total-count">전체 362건</span>
          <select className="sort-select">
            <option>분류</option>
          </select>
        </div>
        <table className="request-table">
          <thead>
            <tr>
              <th>NO.</th>
              <th>카테고리</th>
              <th>설명</th>
              <th>파일유형</th>
              <th>날짜범위</th>
              <th>등록일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((item) => (
              <tr key={item.no}>
                <td>{item.no}</td>
                <td>{item.category}</td>
                <td className="desc">{item.description}</td>
                <td>{item.fileType}</td>
                <td>{item.dateRange}</td>
                <td>{item.regDate}</td>
                <td>
                  <span
                    className={
                      item.status === '미승인'
                        ? 'status status-reject'
                        : 'status status-wait'
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bulletin;
