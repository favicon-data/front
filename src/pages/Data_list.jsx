import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Dlist.css';

const DLIST = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리에서 category 파라미터 읽기
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isClicked, setClicked] = useState(false);

  // 쿼리 파라미터가 바뀌면 selectedCategory 동기화
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setFinalSearchTerm('');
  }, [initialCategory]);

  // 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://54.180.238.119:8080/data-set');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  // 데이터 필터링 로직
  const filteredData = data
    .map((item) => {
      //내용으로 검색
      const description = item.description == null ? 'none' : item.description;
      const title = item.title == null ? 'none' : item.title;
      const theme =
        item.datasetTheme?.theme == null ? 'none' : item.datasetTheme.theme;
      return {
        ...item,
        title,
        description,
        datasetTheme: {
          ...item.datasetTheme,
          theme,
        },
      };
    })
    .filter((item) => {
      if (selectedCategory) {
        return (
          item.datasetTheme?.theme === selectedCategory &&
          (item.title.toLowerCase().includes(finalSearchTerm.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(finalSearchTerm.toLowerCase()))
        );
      }
      return (

        item.title.toLowerCase().includes(finalSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(finalSearchTerm.toLowerCase())
      );
    });

  // 리스트 클릭 시 상세페이지 이동
  const listClick = (e) => {
    setClicked(true);
    const dId = e.currentTarget.dataset.datasetId;
    navigate(`/detail/${dId}`);
  };

  // 검색창 엔터 입력
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setFinalSearchTerm(searchTerm);
    }
  };

  return (
    <>
      <div className="allContent">
        <div>
          <h1
            style={{
              fontSize: '24px',
              margin: '40px 0 40px 80px',
              fontWeight: 'bold',
            }}
          >
            데이터 목록
          </h1>
        </div>
        <div style={{ paddingLeft: '120px' }}>
          <input
            type="text"
            placeholder="어떤 데이터를 찾으시나요?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: '1624px',
              height: '70px',
              padding: '10px 0 10px 30px',
              marginBottom: '20px',
              borderRadius: '30px',
              fontSize: '24px',
            }}
          />
          {/* 검색 결과 개수 출력 */}
          <div
            style={{ height: '60px', position: 'absolute', width: '1624px' }}
          >
            {(finalSearchTerm || selectedCategory) && (
              <p style={{ fontSize: '26px' }}>
                '{finalSearchTerm || selectedCategory}'에 대한 &nbsp;
                {filteredData.length}개의 검색 결과입니다
              </p>
            )}
          </div>
          <hr
            style={{
              border: '2px solid lightgray',
              marginTop: '70px',
              marginLeft: 0,
              width: '1624px',
            }}
          />
          <div
            className="categoryWrapper"
            style={{ display: 'flex', paddingTop: '20px' }}
          >
            {/* 카테고리 필터 */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ marginTop: '25px', fontSize: '18px' }}>필터</p>
              <hr />
              {/* <p style={{ fontSize: '22px' }}>카테고리별</p> */}
              <div
                className="buttonWrap"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <button
                  className="cabutton"
                  style={{ fontSize: '24px', marginTop: '10px' }}
                  onClick={() => {
                    setSelectedCategory('');
                    setFinalSearchTerm('');
                  }}
                >
                  - 전체
                </button>
                <button
                  className="cabutton"
                  onClick={() => setSelectedCategory('기후')}
                  style={{ marginRight: '10px', fontSize: '20px' }}
                >
                  - 기후
                </button>
                <button
                  className="cabutton"
                  style={{ fontSize: '20px' }}
                  onClick={() => setSelectedCategory('질병')}
                >
                  - 질병
                </button>
                <button
                  className="cabutton"
                  style={{ fontSize: '20px' }}
                  onClick={() => setSelectedCategory('환경')}
                >
                  - 환경
                </button>
              </div>
            </div>
            {/* 데이터 출력 */}
            <div className="outputWrapper">
              <hr style={{ width: '58vw', marginLeft: '2vw' }} />
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    key={item.datasetId}
                    className="dataOutput"
                    onClick={listClick}
                    data-dataset-id={item.datasetId}
                  >
                    <div
                      className="output"
                      style={{
                        height: '100%',
                        padding: '30px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '23px',
                          fontWeight: 'bold',
                        }}
                      >
                        <div className="outputCategory">
                          {item.datasetTheme?.theme}
                        </div>
                        {item.title}
                      </div>
                      <p
                        style={{
                          fontSize: '20px',
                          marginTop: '10px',
                          color: 'gray',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ marginLeft: '50px', marginTop: '10px' }}>
                  데이터가 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DLIST;
