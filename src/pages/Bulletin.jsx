import React, { useState, useEffect } from 'react';
import '../styles/Bulletin.css';
import requestImage from '../components/images/request.png';

function Bulletin() {
  const [requestData, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    userId: 1,
    purpose: '',
    title: '',
    content: '',
    organization: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 한 페이지당 보여줄 항목 수

  const API_BASE_URL = 'http://54.180.238.119:8080';

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

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // 요청 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();

    const dataRequestDto = {
      userId: 1,
      purpose: form.purpose,
      title: form.title,
      content: form.content,
      organization: form.organization,
    };

    formData.append(
        'dataRequestDto',
        new Blob([JSON.stringify(dataRequestDto)], { type: 'application/json' })
    );

    if (form.file) {
      formData.append('file', form.file);
    } else {
      setError('파일을 선택해주세요.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/request/list`, {
        method: 'POST',
        body: formData,
      });

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
        userId: 1,
        purpose: '',
        title: '',
        content: '',
        organization: '',
        file: null,
      });
      fetchData();
      setCurrentPage(1); // 등록 후 첫 페이지로 이동
    } catch (e) {
      setError(e.message);
    }
  };

  // 페이징 계산
  const totalPages = Math.ceil(requestData.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 자르기
  const currentData = requestData
      .sort((a, b) => a.dataRequestId - b.dataRequestId)
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
      <div className="page-wrap">
        <div className="content">
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>
            데이터 요청
          </h1>
          <div className="top-bar">
            <span className="total-count">총 {requestData.length}개</span>
            <button className="btn-new" onClick={() => setIsModalOpen(true)}>
              게시글 작성
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
            {currentData.map((item) => (
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

          {/* 페이지네이션 */}
          <div
              className="pagination"
              style={{ marginTop: '20px', textAlign: 'center', userSelect: 'none' }}
          >
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  margin: '0 5px',
                  padding: '5px 10px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
            >
              이전
            </button>

            {/* 첫 페이지 항상 노출 */}
            <button
                onClick={() => handlePageChange(1)}
                style={{
                  margin: '0 3px',
                  padding: '5px 10px',
                  backgroundColor: currentPage === 1 ? '#007bff' : '#eee',
                  color: currentPage === 1 ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
            >
              1
            </button>

            {currentPage - 3 > 1 && <span style={{ margin: '0 5px' }}>...</span>}

            {Array.from({ length: 5 }, (_, i) => i + currentPage - 2)
                .filter((page) => page > 1 && page < totalPages)
                .map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                          margin: '0 3px',
                          padding: '5px 10px',
                          backgroundColor: currentPage === page ? '#007bff' : '#eee',
                          color: currentPage === page ? 'white' : 'black',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                    >
                      {page}
                    </button>
                ))}

            {currentPage + 2 < totalPages - 1 && (
                <span style={{ margin: '0 5px' }}>...</span>
            )}

            {/* 마지막 페이지 */}
            {totalPages > 1 && (
                <button
                    onClick={() => handlePageChange(totalPages)}
                    style={{
                      margin: '0 3px',
                      padding: '5px 10px',
                      backgroundColor: currentPage === totalPages ? '#007bff' : '#eee',
                      color: currentPage === totalPages ? 'white' : 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                >
                  {totalPages}
                </button>
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  margin: '0 5px',
                  padding: '5px 10px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
            >
              다음
            </button>
          </div>

          {/* 모달창 */}
          {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>데이터 요청</h2>
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

                    <div
                        style={{
                          color: 'red',
                          fontSize: '0.9em',
                          marginTop: '8px',
                          whiteSpace: 'pre-line',
                        }}
                    >
                      <img
                          src={requestImage}
                          alt="csv 예시 이미지"
                          style={{ width: '100%', marginTop: '10px', border: '1px solid #ccc' }}
                      />
                      <br />
                      <p>
                        📌 <strong>CSV 예시 이미지</strong>를 참고하세요
                      </p>
                      <p>필수 항목: 항목, 지역, 연도(예: 2021-01), 측정값, 단위</p>
                      <p>예시 단위: 기후 → 일수, °C / 질병 → 명 / 환경 → ㎍/m³ 등</p>
                      <br />
                      <p>
                        📎 파일 속성 값 변경이 어렵다면 요청 내용에 <strong>"수정 필요"</strong> 문구를 입력해주세요.
                      </p>
                      <p>★ 관리자가 확인 후 전처리 및 업로드 됩니다.</p>
                      <p>★ 조건에 부합하지 않을 시 <strong>미승인 처리</strong> 될 수 있습니다.</p>
                    </div>
                    <div className="modal-actions" style={{ marginTop: '10px' }}>
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
