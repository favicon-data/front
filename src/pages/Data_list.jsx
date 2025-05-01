import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Dlist.css';

const DLIST = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 검색창에 입력된 값 (임시)
  const [finalSearchTerm, setFinalSearchTerm] = useState(''); // 엔터 입력 후 확정된 검색어
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리 상태
  const [isClicked, setClicked] = useState(false); //리스트에서 선택되었는지 여부
  const navigate = useNavigate();

  const listClick = (e) => {
    setClicked(true);
    const dId = e.currentTarget.dataset.datasetId;
    navigate(`/detail/${dId}`);
  };

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

  // 데이터 필터링 로직
  //map : 각 요소 반환(새로운 배열) filter : 조건 만족한 요소만 출력
  const filteredData = data
    .map((item) => {
      const description = item.description == null ? 'none' : item.description;
      const theme =
        item.datasetTheme?.theme == null ? 'none' : item.datasetTheme.theme;
      return {
        // ...은 모든 속성 반환하는 것
        ...item,
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
          item.description.toLowerCase().includes(finalSearchTerm.toLowerCase())
        );
      }
      return item.description
        .toLowerCase()
        .includes(finalSearchTerm.toLowerCase());
    });

  // 검색창에서 엔터 키를 눌렀을 때 호출되는 함수
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setFinalSearchTerm(searchTerm); // 검색어 확정
    }
  };

  return (
    <>
      <div>
        <h3 style={{ fontSize: '28px', margin: '40px 0 40px 80px' }}>
          데이터 목록
        </h3>
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
        <div style={{ height: '60px', position: 'absolute', width: '1624px' }}>
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
          <div
            style={{
              marginBottom: '20px',
              // display: 'flex',
              // flexDirection: 'column',
            }}
          >
            <p style={{ margin: 'none', fontSize: '18px' }}>필터</p>
            <hr />
            <p style={{ fontSize: '22px' }}>카테고리별</p>
            <div
              className="buttonWrap"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <button
                className="cabutton"
                style={{ fontSize: '24px' }}
                onClick={() => {
                  setSelectedCategory('');
                  setFinalSearchTerm(''); // 카테고리를 초기화할 때 검색어도 초기화
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
              <p style={{ marginLeft: '50px' }}>데이터가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DLIST;
