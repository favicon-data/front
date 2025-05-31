// import React, { useState, useEffect } from 'react';
// import '../Bulletin.css';

// function Bulletin() {
//   const [requestData, setData] = useState([]);

//   const API_BASE_URL = 'http://54.180.238.119:8080';

//   // 데이터 fetch
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`${API_BASE_URL}/request/list`);
//       const json = await response.json();
//       if (json.status === 'error') {
//         throw new Error('데이터 가져오기 실패');
//       }
//       setData(json.data);
//     };
//     console.log(requestData);
//     fetchData();
//   }, []);

//   return (
//     <div className="page-wrap">
//       <div className="content">
//         <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>
//           사용자 요청
//         </h1>
//         <div className="top-bar">
//           <span className="total-count">총 {requestData.length}개의 요청</span>
//           {/* <select className="sort-select">
//             <option>분류</option>
//           </select> */}
//         </div>
//         <table className="request-table">
//           <thead>
//             <tr>
//               <th>NO.</th>
//               <th>사용자</th>
//               <th>제목</th>
//               <th>목적</th>
//               <th>설명</th>
//               <th>기관</th>
//               <th>등록일</th>
//               <th>상태</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[...requestData]
//               .sort((a, b) => a.dataRequestId - b.dataRequestId)
//               .map((item) => (
//                 <tr key={item.dataRequestId}>
//                   <td>{item.dataRequestId}</td>
//                   <td>{item?.user.userName}</td>
//                   <td>{item.title}</td>
//                   <td>{item.purpose}</td>
//                   <td className="desc">{item.content}</td>
//                   <td>{item.organization}</td>
//                   <td>{item.uploadDate}</td>
//                   <td>
//                     <span
//                       className={
//                         item.reviewStatus === 'APPROVED'
//                           ? 'status status-approve'
//                           : item.reviewStatus === 'REJECTED'
//                           ? 'status status-reject'
//                           : 'status status-wait'
//                       }
//                     >
//                       {item.reviewStatus === 'APPROVED'
//                         ? '승인'
//                         : item.reviewStatus === 'REJECTED'
//                         ? '미승인'
//                         : '대기'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Bulletin;
import React, { useState, useEffect } from 'react';
import '../styles/Bulletin.css';

function Bulletin() {
  const [requestData, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    userId: 1, // userId를 1로 하드코딩
    purpose: '',
    title: '',
    content: '',
    organization: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://54.180.238.119:8080';

  // 모달 열릴 때마다 userId를 1로 고정
  useEffect(() => {
    if (isModalOpen) {
      setForm((prev) => ({
        ...prev,
        userId: 1,
      }));
    }
  }, [isModalOpen]);

  // 데이터 fetch
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/request/list`);
      const json = await response.json();
      if (json.status === 'error') {
        throw new Error('데이터 가져오기 실패');
      }
      setData(json.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // 요청 등록 (multipart/form-data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();

    const dataRequestDto = {
      userId: 1, // 항상 1로 고정
      purpose: form.purpose,
      title: form.title,
      content: form.content,
      // file: '',
      // fileUrl: '',
      organization: form.organization,
    };

    formData.append(
      'dataRequestDto',
      new Blob([JSON.stringify(dataRequestDto)], { type: 'application/json' })
    );

    if (form.file) {
      formData.append('file', form.file);
      console.log('file', form.file);
    } else {
      setError('파일을 선택해주세요.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/request/list`, {
        method: 'POST',
        body: formData,
      });
      console.log(dataRequestDto);

      let json;
      try {
        json = await response.json();
      } catch {
        json = null;
      }

      if (!json || json.status !== 'success') {
        throw new Error(json?.message || '등록 실패');
      }

      setIsModalOpen(false);
      setForm({
        userId: 1, // 등록 후에도 userId 1로 초기화
        purpose: '',
        title: '',
        content: '',
        organization: '',
        file: null,
      });
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="page-wrap">
      <div className="content">
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>
          사용자 요청
        </h1>
        <div className="top-bar">
          <span className="total-count">총 {requestData.length}개의 요청</span>
          <button className="btn-new" onClick={() => setIsModalOpen(true)}>
            새 요청 등록
          </button>
        </div>
        {loading && <div>로딩중...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <table className="request-table">
          <thead>
            <tr>
              <th>NO.</th>
              {/* <th>사용자</th> */}
              <th>제목</th>
              <th>목적</th>
              <th>설명</th>
              <th>기관</th>
              <th>등록일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {[...requestData]
              .sort((a, b) => a.dataRequestId - b.dataRequestId)
              .map((item) => (
                <tr key={item.dataRequestId}>
                  <td>{item.dataRequestId}</td>
                  {/* <td>{item?.user.userName}</td> */}
                  <td>{item.title}</td>
                  <td>{item.purpose}</td>
                  <td className="desc">{item.content}</td>
                  <td>{item.organization}</td>
                  <td>{item.uploadDate}</td>
                  <td>
                    <span
                      className={
                        item.reviewStatus === 'APPROVED'
                          ? 'status status-approve'
                          : item.reviewStatus === 'REJECTED'
                          ? 'status status-reject'
                          : 'status status-wait'
                      }
                    >
                      {item.reviewStatus === 'APPROVED'
                        ? '승인'
                        : item.reviewStatus === 'REJECTED'
                        ? '미승인'
                        : '대기'}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* 모달창 */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>새 요청 등록</h2>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="userId" value={form.userId} />
                <div>
                  <label>목적:</label>
                  <input
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>제목:</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>설명:</label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>기관:</label>
                  <input
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>파일 첨부:</label>
                  <input
                    type="file"
                    name="file"
                    accept="*"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit">등록</button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{ marginLeft: '10px' }}
                  >
                    취소
                  </button>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bulletin;
