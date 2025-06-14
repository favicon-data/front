// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../styles/Dlist.css';

// // const API_BASE_URL = "http://localhost:8082"
// const API_BASE_URL = 'http://54.180.238.119:8080';

// const DLIST = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // URL 쿼리에서 category 파라미터 읽기
//   const queryParams = new URLSearchParams(location.search);
//   const initialCategory = queryParams.get('category') || '';

//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [finalSearchTerm, setFinalSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);
//   const [isClicked, setClicked] = useState(false);

//   // 쿼리 파라미터가 바뀌면 selectedCategory 동기화
//   useEffect(() => {
//     setSelectedCategory(initialCategory);
//     setFinalSearchTerm('');
//   }, [initialCategory]);

//   // 데이터 fetch
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
//   }, []);

//   // 데이터 필터링 로직
//   const filteredData = data
//     .map((item) => {
//       //내용으로 검색
//       const description = item.description == null ? 'none' : item.description;
//       const title = item.title == null ? 'none' : item.title;
//       const theme =
//         item.datasetTheme?.theme == null ? 'none' : item.datasetTheme.theme;
//       return {
//         ...item,
//         title,
//         description,
//         datasetTheme: {
//           ...item.datasetTheme,
//           theme,
//         },
//       };
//     })
//     .filter((item) => {
//       if (selectedCategory) {
//         return (
//           item.datasetTheme?.theme === selectedCategory &&
//           (item.title.toLowerCase().includes(finalSearchTerm.toLowerCase()) ||
//             item.description
//               .toLowerCase()
//               .includes(finalSearchTerm.toLowerCase()))
//         );
//       }
//       return (
//         item.title.toLowerCase().includes(finalSearchTerm.toLowerCase()) ||
//         item.description.toLowerCase().includes(finalSearchTerm.toLowerCase())
//       );
//     });

//   // 리스트 클릭 시 상세페이지 이동
//   const listClick = (e) => {
//     setClicked(true);
//     const dId = e.currentTarget.dataset.datasetId;
//     navigate(`/detail/${dId}`);
//   };

//   // 검색창 엔터 입력
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       setFinalSearchTerm(searchTerm);
//     }
//   };

//   return (
//     <>
//       <div className="allContent">
//         <div>
//           <h1
//             style={{
//               fontSize: '24px',
//               margin: '40px 0 40px 80px',
//               fontWeight: 'bold',
//             }}
//           >
//             데이터 목록
//           </h1>
//         </div>
//         <div style={{ paddingLeft: '120px' }}>
//           <input
//             type="text"
//             placeholder="어떤 데이터를 찾으시나요?"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyPress={handleKeyPress}
//             style={{
//               width: '1624px',
//               height: '70px',
//               padding: '10px 0 10px 30px',
//               marginBottom: '20px',
//               borderRadius: '30px',
//               fontSize: '24px',
//             }}
//           />
//           {/* 검색 결과 개수 출력 */}
//           <div
//             style={{ height: '60px', position: 'absolute', width: '1624px' }}
//           >
//             {(finalSearchTerm || selectedCategory) && (
//               <p style={{ fontSize: '26px' }}>
//                 '{finalSearchTerm || selectedCategory}'에 대한 &nbsp;
//                 {filteredData.length}개의 검색 결과입니다
//               </p>
//             )}
//           </div>
//           <hr
//             style={{
//               border: '2px solid lightgray',
//               marginTop: '70px',
//               marginLeft: 0,
//               width: '1624px',
//             }}
//           />
//           <div
//             className="categoryWrapper"
//             style={{ display: 'flex', paddingTop: '20px' }}
//           >
//             {/* 카테고리 필터 */}
//             <div style={{ marginBottom: '20px' }}>
//               <p style={{ marginTop: '25px', fontSize: '18px' }}>필터</p>
//               <hr />
//               {/* <p style={{ fontSize: '22px' }}>카테고리별</p> */}
//               <div
//                 className="buttonWrap"
//                 style={{ display: 'flex', flexDirection: 'column' }}
//               >
//                 <button
//                   className="cabutton"
//                   style={{ fontSize: '24px', marginTop: '10px' }}
//                   onClick={() => {
//                     setSelectedCategory('');
//                     setFinalSearchTerm('');
//                   }}
//                 >
//                   - 전체
//                 </button>
//                 <button
//                   className="cabutton"
//                   onClick={() => setSelectedCategory('기후')}
//                   style={{ marginRight: '10px', fontSize: '20px' }}
//                 >
//                   - 기후
//                 </button>
//                 <button
//                   className="cabutton"
//                   style={{ fontSize: '20px' }}
//                   onClick={() => setSelectedCategory('질병')}
//                 >
//                   - 질병
//                 </button>
//                 <button
//                   className="cabutton"
//                   style={{ fontSize: '20px' }}
//                   onClick={() => setSelectedCategory('환경')}
//                 >
//                   - 환경
//                 </button>
//               </div>
//             </div>
//             {/* 데이터 출력 */}
//             <div className="outputWrapper">
//               <hr style={{ width: '58vw', marginLeft: '2vw' }} />
//               {filteredData.length > 0 ? (
//                 filteredData.map((item) => (
//                   <div
//                     key={item.datasetId}
//                     className="dataOutput"
//                     onClick={listClick}
//                     data-dataset-id={item.datasetId}
//                   >
//                     <div
//                       className="output"
//                       style={{
//                         height: '100%',
//                         padding: '30px',
//                         marginTop: '10px',
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           fontSize: '23px',
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         <div className="outputCategory">
//                           {item.datasetTheme?.theme}
//                         </div>
//                         {item.title}
//                       </div>
//                       <p
//                         style={{
//                           fontSize: '20px',
//                           marginTop: '10px',
//                           color: 'gray',
//                         }}
//                       >
//                         {item.description}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p style={{ marginLeft: '50px', marginTop: '10px' }}>
//                   데이터가 없습니다.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DLIST;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Dlist.css';
import { FaSearch } from 'react-icons/fa';

const API_BASE_URL = 'http://54.180.238.119:8080';

const DLIST = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const initialSearch = queryParams.get('search') || '';

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSearchTerm(initialSearch);
    setFinalSearchTerm(initialSearch);
    setCurrentPage(1);
  }, [initialCategory, initialSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/data-set`);
      const json = await response.json();
      if (json.status === 'error') throw new Error('데이터 가져오기 실패');
      setData(json.data);
    };
    fetchData();
  }, []);

  // 필터링 및 기본 데이터 정리
  const filteredData = data
    .map((item) => {
      const description = item.description || 'none';
      const title = item.title || 'none';
      const theme = item.datasetTheme?.theme || 'none';
      return {
        ...item,
        title,
        description,
        datasetTheme: { ...item.datasetTheme, theme },
      };
    })
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(finalSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(finalSearchTerm.toLowerCase());
      if (selectedCategory) {
        return item.datasetTheme?.theme === selectedCategory && matchesSearch;
      }
      return matchesSearch;
    });

  // 페이징 처리 변수
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pagedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const listClick = (e) => {
    const dId = e.currentTarget.dataset.datasetId;
    navigate(`/detail/${dId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setFinalSearchTerm(searchTerm);
      setCurrentPage(1);
    }
  };

  const getThemeColor = (theme) => {
    switch (theme) {
      case '기후':
        return '#2196F3'; // blue
      case '질병':
        return '#F44336'; // red
      case '환경':
        return '#4CAF50'; // green
      default:
        return '#ccc';
    }
  };

  const categories = ['', '기후', '질병', '환경'];

  // 페이지 번호 생성 (앞뒤 2개, 처음/끝 포함, 나머지는 '...' 처리)
  const getPageNumbers = () => {
    if (totalPages <= 1) return [];

    const pages = [];
    pages.push(1);

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (startPage > 2) pages.push('left-ellipsis');
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) pages.push('right-ellipsis');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  // 페이지 클릭 시 동작
  const onPageClick = (page) => {
    if (page === 'left-ellipsis') {
      setCurrentPage(Math.max(1, currentPage - 5));
    } else if (page === 'right-ellipsis') {
      setCurrentPage(Math.min(totalPages, currentPage + 5));
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="allContent" style={{ padding: '40px 80px' }}>
      <h1
        style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px' }}
      >
        데이터 목록
      </h1>

      {/* 검색창 */}
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            width: '100%',
            height: '60px',
            padding: '10px 60px 10px 20px',
            borderRadius: '30px',
            fontSize: '20px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        />
        <FaSearch
          onClick={() => {
            setFinalSearchTerm(searchTerm);
            setCurrentPage(1);
          }}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '24px',
            color: '#8aa47e',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* 검색결과 출력 */}
      {(finalSearchTerm || selectedCategory) && (
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>
          '{finalSearchTerm || selectedCategory}'에 대한&nbsp;
          <strong>{filteredData.length}</strong>개의 검색 결과입니다.
        </p>
      )}

      <div style={{ display: 'flex' }}>
        {/* 카테고리 필터 */}
        <div style={{ width: '200px', marginRight: '40px' }}>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            필터
          </p>
          <hr />
          {categories.map((cat) => (
            <button
              key={cat}
              className="cabutton"
              onClick={() => {
                setSelectedCategory(cat);
                setFinalSearchTerm('');
                setCurrentPage(1);
              }}
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '10px 0',
                padding: '10px 15px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor:
                  selectedCategory === cat ? getThemeColor(cat) : '#f5f5f5',
                color: selectedCategory === cat ? 'white' : 'black',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              - {cat === '' ? '전체' : cat}
            </button>
          ))}
        </div>

        {/* 데이터 목록 출력 */}
        <div style={{ flex: 1 }}>
          {pagedData.length > 0 ? (
            pagedData.map((item) => (
              <div
                key={item.datasetId}
                data-dataset-id={item.datasetId}
                onClick={listClick}
                style={{
                  borderLeft: `6px solid ${getThemeColor(
                    item.datasetTheme?.theme
                  )}`,
                  backgroundColor: '#fff',
                  padding: '20px',
                  marginBottom: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}
                >
                  [{item.datasetTheme?.theme}] {item.title}
                </div>
                <p style={{ fontSize: '16px', color: 'gray' }}>
                  {item.description}
                </p>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '18px', color: 'gray' }}>
              데이터가 없습니다.
            </p>
          )}

          {/* 페이징 UI */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
                marginBottom: '40px',
                gap: '8px',
                flexWrap: 'wrap',
                userSelect: 'none',
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  fontSize: '18px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                }}
              >
                &lt;
              </button>

              {getPageNumbers().map((page, idx) =>
                page === 'left-ellipsis' || page === 'right-ellipsis' ? (
                  <span
                    key={page + idx}
                    onClick={() => onPageClick(page)}
                    style={{
                      cursor: 'pointer',
                      padding: '8px 12px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      userSelect: 'none',
                    }}
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageClick(page)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '18px',
                      cursor: 'pointer',
                      fontWeight: currentPage === page ? 'bold' : 'normal',
                      backgroundColor:
                        currentPage === page ? '#d3d3d3' : 'white',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                    }}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 12px',
                  fontSize: '18px',
                  cursor:
                    currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                }}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DLIST;
