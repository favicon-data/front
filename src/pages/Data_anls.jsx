// import { useState, useEffect } from 'react';
// import '../Danls.css';
// import ChartVisualization from '../components/Analysis.jsx';
// import GptClimateAnalyzer from '../components/gpt.jsx';

// const Danls = () => {
//   const [activeToggle, setActiveToggle] = useState(null);

//   const [selectedOptions, setSelectedOptions] = useState({
//     기후: [],
//     환경: [],
//     질병: [],
//   });

//   const [optionsData, setOptionsData] = useState({
//     기후: [],
//     환경: [],
//     질병: [],
//   });

//   const [selectedRegions, setSelectedRegions] = useState([]);
//   const [regionsData, setRegionsData] = useState([]);

//   const [period, setPeriod] = useState({
//     start: '2020-01-01',
//     end: '2023-12-01',
//   });

//   const [analysisData, setAnalysisData] = useState({
//     title: '경기 지역 기온과 미세먼지 데이터 비교',
//     selectedFilters: [
//       { category: '기후', option: '기온' },
//       { category: '환경', option: '미세먼지' },
//     ],
//     period: '2018년 08월 01일 ~ 2019년 05월 31일',
//     findings: '데이터가 없습니다',
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [isDataLoading, setIsDataLoading] = useState(true);

//   // 옵션 데이터 가져오기
//   useEffect(() => {
//     const fetchOptionsData = async () => {
//       setIsDataLoading(true);
//       try {
//         const response = await fetch(
//           'http://54.180.238.119:8080/data-set/group-by-theme'
//         );
//         if (!response.ok) throw new Error('서버 응답 오류');
//         const data = await response.json();
//         if (data.기후 && data.환경 && data.질병) {
//           setOptionsData({
//             기후: data.기후,
//             환경: data.환경,
//             질병: data.질병,
//           });
//         }
//         setIsDataLoading(false);
//       } catch (error) {
//         setIsDataLoading(false);
//         setOptionsData({
//           기후: ['기온'],
//           환경: ['미세먼지'],
//           질병: ['감기'],
//         });
//       }
//     };
//     fetchOptionsData();
//   }, []);

//   // 지역 데이터 가져오기
//   useEffect(() => {
//     const fetchRegionsData = async () => {
//       setIsDataLoading(true);
//       try {
//         const response = await fetch('http://54.180.238.119:8080/region');
//         if (!response.ok) throw new Error('서버 응답 오류');
//         const data = await response.json();
//         if (Array.isArray(data)) {
//           if (typeof data[0] === 'string') {
//             setRegionsData(data.map((region) => ({ regionName: region })));
//           } else {
//             setRegionsData(data);
//           }
//         }
//         setIsDataLoading(false);
//       } catch (error) {
//         setIsDataLoading(false);
//         setRegionsData([
//           { regionName: '경기' },
//           { regionName: '강원' },
//           { regionName: '서울' },
//           { regionName: '부산' },
//           { regionName: '대구' },
//           { regionName: '인천' },
//         ]);
//       }
//     };
//     fetchRegionsData();
//   }, []);

//   const handleToggle = (toggleName) => {
//     setActiveToggle(activeToggle === toggleName ? null : toggleName);
//   };

//   const getTotalSelectedOptions = () => {
//     return Object.values(selectedOptions).reduce(
//       (total, options) => total + options.length,
//       0
//     );
//   };

//   const handleOptionChange = (category, option) => {
//     setSelectedOptions((prev) => {
//       const updated = { ...prev };
//       if (updated[category].includes(option)) {
//         updated[category] = updated[category].filter((opt) => opt !== option);
//         return updated;
//       }
//       const totalSelected = getTotalSelectedOptions();
//       if (totalSelected >= 2) {
//         alert('옵션은 최대 2개까지만 선택할 수 있습니다.');
//         return prev;
//       }
//       updated[category] = [...updated[category], option];
//       return updated;
//     });
//   };

//   const handleRegionChange = (regionName) => {
//     setSelectedRegions((prev) => {
//       if (prev.includes(regionName)) {
//         return prev.filter((r) => r !== regionName);
//       } else {
//         return [...prev, regionName];
//       }
//     });
//   };

//   const formatDateForDisplay = (dateString) => {
//     return dateString.replace('-', '.');
//   };

//   const handleDateChange = (type, value) => {
//     setPeriod((prev) => ({
//       ...prev,
//       [type]: value,
//     }));
//   };

//   // **핵심: 분석 실행 핸들러 수정**
//   const handleAnalyze = async () => {
//     if (getTotalSelectedOptions() === 0 || selectedRegions.length === 0) {
//       alert('옵션과 지역을 선택해주세요.');
//       return;
//     }
//     setIsLoading(true);
//     setActiveToggle(null);

//     try {
//       // 옵션 1~2개 추출
//       const allSelectedOptions = Object.entries(selectedOptions).flatMap(
//         ([category, options]) => options.map((option) => ({ category, option }))
//       );
//       const theme1 = allSelectedOptions[0]?.option || '';
//       const theme2 = allSelectedOptions[1]?.option || '';

//       // 지역 string 추출
//       const region =
//         typeof selectedRegions[0] === 'string'
//           ? selectedRegions[0]
//           : selectedRegions[0]?.regionName || '';

//       // 서버 요구 형식에 맞게 데이터 구성
//       const requestData = {
//         theme1,
//         theme2,
//         region,
//         start: period.start,
//         end: period.end,
//       };

//       const response = await fetch('http://54.180.238.119:8080/analysis', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });
//       // console.log('분석 요청 데이터:', requestData);

//       // 응답 상태 확인 후 파싱
//       if (!response.ok) {
//         let errorMsg = '';
//         try {
//           errorMsg = (await response.json()).message;
//         } catch {
//           errorMsg = response.statusText;
//         }
//         alert(`분석 요청 실패: ${response.status} ${errorMsg}`);
//         setIsLoading(false);
//         return;
//       }

//       const data = await response.json();
//       setAnalysisData({
//         ...data,
//         title: analysisData.title,
//       });
//       setIsLoading(false);
//     } catch (error) {
//       console.error('분석 중 오류 발생:', error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const allSelectedOptions = Object.entries(selectedOptions).flatMap(
//       ([category, options]) => options.map((option) => ({ category, option }))
//     );
//     if (allSelectedOptions.length > 0) {
//       setAnalysisData({
//         title: `${selectedRegions.join(', ')} 지역 ${allSelectedOptions
//           .map((item) => item.option)
//           .join(', ')} 데이터 비교`,
//         selectedFilters: allSelectedOptions,
//         period: `${formatDateForDisplay(
//           period.start
//         )}년 01일 ~ ${formatDateForDisplay(period.end)}년 31일`,
//         findings:
//           '선택하신 기간 동안 기온과 미세먼지 사이에 양의 상관관계(0.78)가 발견되었습니다. 특히 4월에 가장 높은 수치를 보였습니다.',
//       });
//     }
//   }, [selectedOptions, selectedRegions, period]);

//   // 카테고리 토글 렌더링
//   const renderCategoryToggle = () => {
//     if (activeToggle !== '카테고리') return null;
//     return (
//       <div className="categories-container">
//         <div className="options-container">
//           {isDataLoading ? (
//             <div className="loading-container">데이터 로딩 중...</div>
//           ) : (
//             <div className="options-row">
//               <div className="option-column">
//                 {[...new Set(optionsData['기후'])].map((option) => (
//                   <div className="option-item" key={option}>
//                     <input
//                       type="checkbox"
//                       id={`option-기후-${option}`}
//                       checked={selectedOptions['기후'].includes(option)}
//                       onChange={() => handleOptionChange('기후', option)}
//                     />
//                     <label htmlFor={`option-기후-${option}`}>{option}</label>
//                   </div>
//                 ))}
//               </div>
//               <div className="option-column">
//                 {[...new Set(optionsData['환경'])].map((option) => (
//                   <div className="option-item" key={option}>
//                     <input
//                       type="checkbox"
//                       id={`option-환경-${option}`}
//                       checked={selectedOptions['환경'].includes(option)}
//                       onChange={() => handleOptionChange('환경', option)}
//                     />
//                     <label htmlFor={`option-환경-${option}`}>{option}</label>
//                   </div>
//                 ))}
//               </div>
//               <div className="option-column">
//                 {[...new Set(optionsData['질병'])].map((option) => (
//                   <div className="option-item" key={option}>
//                     <input
//                       type="checkbox"
//                       id={`option-질병-${option}`}
//                       checked={selectedOptions['질병'].includes(option)}
//                       onChange={() => handleOptionChange('질병', option)}
//                     />
//                     <label htmlFor={`option-질병-${option}`}>{option}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // 지역 토글 렌더링
//   const renderRegionToggle = () => {
//     if (activeToggle !== '지역') return null;
//     return (
//       <div className="region-toggle-content">
//         <div className="region-options-grid">
//           {isDataLoading ? (
//             <div className="loading-container">데이터 로딩 중...</div>
//           ) : (
//             regionsData.map((regionObj) => (
//               <div key={regionObj.regionName} className="region-option">
//                 <input
//                   type="checkbox"
//                   id={`region-${regionObj.regionName}`}
//                   checked={selectedRegions.includes(regionObj.regionName)}
//                   onChange={() => handleRegionChange(regionObj.regionName)}
//                 />
//                 <label htmlFor={`region-${regionObj.regionName}`}>
//                   {regionObj.regionName}
//                 </label>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     );
//   };

//   // 기간 토글 렌더링
//   const renderPeriodToggle = () => {
//     if (activeToggle !== '기간') return null;
//     return (
//       <div className="period-toggle-content">
//         <div className="period-inputs-container">
//           <div className="period-input-group">
//             <label htmlFor="period-start">시작 기간</label>
//             <input
//               style={{ width: '515px' }}
//               id="period-start"
//               type="date"
//               value={period.start}
//               onChange={(e) => handleDateChange('start', e.target.value)}
//               className="date-picker"
//             />
//           </div>
//           <span className="period-separator">~</span>
//           <div className="period-input-group">
//             <label htmlFor="period-end">종료 기간</label>
//             <input
//               style={{ width: '515px' }}
//               id="period-end"
//               type="date"
//               value={period.end}
//               onChange={(e) => handleDateChange('end', e.target.value)}
//               className="date-picker"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="data-analysis-container">
//       <h1 className="page-title">데이터 분석</h1>
//       <div className="instruction">
//         <span className="bullet">■</span> 카테고리를 1~2개 선택해주세요
//       </div>
//       <div className="analysis-section">
//         <div className="toggle-buttons">
//           <div className="category_wrap">
//             <button
//               className={`toggle-button ${
//                 activeToggle === '카테고리' ? 'active' : ''
//               }`}
//               onClick={() => handleToggle('카테고리')}
//             >
//               기후
//             </button>
//             <button
//               className={`toggle-button ${
//                 activeToggle === '카테고리' ? 'active' : ''
//               }`}
//               onClick={() => handleToggle('카테고리')}
//             >
//               환경
//             </button>
//             <button
//               className={`toggle-button ${
//                 activeToggle === '카테고리' ? 'active' : ''
//               }`}
//               onClick={() => handleToggle('카테고리')}
//             >
//               질병
//             </button>
//           </div>
//           <div className="category_wrap">
//             <button
//               className={`toggle-button ${
//                 activeToggle === '지역' ? 'active' : ''
//               }`}
//               onClick={() => handleToggle('지역')}
//             >
//               지역
//             </button>
//             <button
//               className={`toggle-button ${
//                 activeToggle === '기간' ? 'active' : ''
//               }`}
//               onClick={() => handleToggle('기간')}
//             >
//               기간
//             </button>
//             <button
//               className="toggle-button analyze"
//               onClick={handleAnalyze}
//               disabled={isLoading}
//             >
//               {isLoading ? '분석 중...' : '분석'}
//             </button>
//           </div>
//         </div>
//         <div className={`toggle-content ${activeToggle ? 'active' : ''}`}>
//           {renderCategoryToggle()}
//           {renderRegionToggle()}
//           {renderPeriodToggle()}
//         </div>
//       </div>
//       <div className="results-and-chart">
//         <div className="chart-container">
//           <h3 className="chart-title">{analysisData.title}</h3>
//           <div className="chart-placeholder">
//             <ChartVisualization
//               data={analysisData.data}
//               title={analysisData.title}
//             />
//           </div>
//         </div>
//         <div className="analysis-results">
//           <h2 className="results-title">데이터 분석 결과</h2>
//           <div className="selected-filters">
//             <h3>선택된 필터</h3>
//             <div className="filter-tags">
//               {Object.entries(selectedOptions).map(([category, options]) =>
//                 options.map((option, idx) => (
//                   <div key={`${category}-${idx}`} className="filter-tag">
//                     <span className="filter-dot"></span>
//                     <span>{option}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//           <div className="selected-regions">
//             <h3>선택된 지역</h3>
//             <div className="filter-tags">
//               {selectedRegions.map((region, index) => (
//                 <div key={index} className="filter-tag">
//                   <span className="filter-dot"></span>
//                   <span>{region}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="analysis-period">
//             <h3>분석 기간</h3>
//             <p>
//               {formatDateForDisplay(period.start)} ~{' '}
//               {formatDateForDisplay(period.end)}
//             </p>
//           </div>
//           <div className="key-findings">
//             <h3>주요 발견</h3>
//             {analysisData && analysisData.data && (
//               <GptClimateAnalyzer
//                 jsonData={JSON.stringify(analysisData.data)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Danls;
import { useState, useEffect } from 'react';
import '../Danls.css';
import Analysis from '../components/Analysis.jsx';
import GptClimateAnalyzer from '../components/gpt.jsx';

// const API_BASE_URL = "http://localhost:8082"
const API_BASE_URL = 'http://54.180.238.119:8080';

const Danls = () => {
  const [activeToggle, setActiveToggle] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState({
    기후: [],
    환경: [],
    질병: [],
  });

  const [optionsData, setOptionsData] = useState({
    기후: [],
    환경: [],
    질병: [],
  });

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [regionsData, setRegionsData] = useState([]);

  const [period, setPeriod] = useState({
    start: '2020-01-01',
    end: '2023-12-01',
  });

  // 분석 결과 데이터: 실제 그래프 데이터는 data에 저장됨
  const [analysisData, setAnalysisData] = useState({
    title: '경기 지역 기온과 미세먼지 데이터 비교',
    data: null, // 실제 분석 결과를 여기에 저장
    selectedFilters: [
      { category: '기후', option: '기온' },
      { category: '환경', option: '미세먼지' },
    ],
    period: '2018년 08월 01일 ~ 2019년 05월 31일',
    findings: '데이터가 없습니다',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // 옵션 데이터 가져오기
  useEffect(() => {
    const fetchOptionsData = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/data-set/group-by-theme`);
        const datas = await response.json();
        if (datas.status === 'error') throw new Error('서버 응답 오류');
        const data = datas.data;
        if (data.기후 && data.환경 && data.질병) {
          setOptionsData({
            기후: data.기후,
            환경: data.환경,
            질병: data.질병,
          });
        }
        setIsDataLoading(false);
      } catch (error) {
        setIsDataLoading(false);
        setOptionsData({
          기후: ['기온'],
          환경: ['미세먼지'],
          질병: ['감기'],
        });
      }
    };
    fetchOptionsData();
  }, []);

  // 지역 데이터 가져오기
  useEffect(() => {
    const fetchRegionsData = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/region`);
        const data = await response.json();
        if (data.status != 'success') throw new Error('서버 응답 오류');

        if (Array.isArray(data.data)) {
          if (typeof data.data[0] === 'string') {
            setRegionsData(data.data.map((region) => ({ regionName: region })));
          } else {
            setRegionsData(data.data);
          }
        }
        setIsDataLoading(false);
      } catch (error) {
        setIsDataLoading(false);
        setRegionsData([
          { regionName: '경기' },
          { regionName: '강원' },
          { regionName: '서울' },
          { regionName: '부산' },
          { regionName: '대구' },
          { regionName: '인천' },
        ]);
      }
    };
    fetchRegionsData();
  }, []);

  const handleToggle = (toggleName) => {
    setActiveToggle(activeToggle === toggleName ? null : toggleName);
  };

  const getTotalSelectedOptions = () => {
    return Object.values(selectedOptions).reduce(
      (total, options) => total + options.length,
      0
    );
  };

  const handleOptionChange = (category, option) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(option)) {
        updated[category] = updated[category].filter((opt) => opt !== option);
        return updated;
      }
      const totalSelected = getTotalSelectedOptions();
      if (totalSelected >= 2) {
        alert('옵션은 최대 2개까지만 선택할 수 있습니다.');
        return prev;
      }
      updated[category] = [...updated[category], option];
      return updated;
    });
  };

  // const handleRegionChange = (regionName) => {
  //   setSelectedRegions((prev) => {
  //     if (prev.includes(regionName)) {
  //       return prev.filter((r) => r !== regionName);
  //     } else {
  //       return [...prev, regionName];
  //     }
  //   });
  // };

  // 지역은 하나만 선택 가능하도록 수정
  const handleRegionChange = (regionName) => {
    setSelectedRegions((prev) => {
      if (prev.includes(regionName)) {
        // 이미 선택된 지역을 다시 클릭하면 선택 해제
        return [];
      } else {
        // 새로운 지역 선택 시 기존 선택 해제 후 새 지역만 선택
        return [regionName];
      }
    });
  };

  const formatDateForDisplay = (dateString) => {
    return dateString.replace('-', '.');
  };

  const handleDateChange = (type, value) => {
    setPeriod((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // 분석 실행 핸들러 (POST로 실제 데이터 받아오기)
  const handleAnalyze = async () => {
    if (getTotalSelectedOptions() === 0 || selectedRegions.length === 0) {
      alert('옵션과 지역을 선택해주세요.');
      return;
    }
    setIsLoading(true);
    setActiveToggle(null);

    try {
      const allSelectedOptions = Object.entries(selectedOptions).flatMap(
        ([category, options]) => options.map((option) => ({ category, option }))
      );
      const theme1 = allSelectedOptions[0]?.option || '';
      const theme2 = allSelectedOptions[1]?.option || '';
      const region =
        typeof selectedRegions[0] === 'string'
          ? selectedRegions[0]
          : selectedRegions[0]?.regionName || '';
      const requestData = {
        theme1,
        theme2,
        region,
        start: period.start,
        end: period.end,
      };

      const response = await fetch(`${API_BASE_URL}/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      let data;
      try {
        data = await response.json();
      } catch (e) {
        alert(`분석 요청 실패: ${response.status} ${response.statusText}`);
        setIsLoading(false);
        return;
      }

      if (data.status === 'error') {
        const errorMsg = data.message || response.statusText;
        alert(`분석 요청 실패: ${response.status} ${errorMsg}`);
        setIsLoading(false);
        return;
      }

      setAnalysisData((prev) => ({
        ...prev,
        data: data.data, // 실제 그래프 데이터 전체를 data에 저장
      }));
      setIsLoading(false);
    } catch (error) {
      console.error('분석 중 오류 발생:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const allSelectedOptions = Object.entries(selectedOptions).flatMap(
      ([category, options]) => options.map((option) => ({ category, option }))
    );
    if (allSelectedOptions.length > 0) {
      setAnalysisData((prev) => ({
        ...prev,
        title: `${selectedRegions.join(', ')} 지역 ${allSelectedOptions
          .map((item) => item.option)
          .join(', ')} 데이터 비교`,
        selectedFilters: allSelectedOptions,
        period: `${formatDateForDisplay(
          period.start
        )}년 01일 ~ ${formatDateForDisplay(period.end)}년 31일`,
      }));
    }
  }, [selectedOptions, selectedRegions, period]);

  // 카테고리 토글 렌더링
  const renderCategoryToggle = () => {
    if (activeToggle !== '카테고리') return null;
    return (
      <div className="categories-container">
        <div className="options-container">
          {isDataLoading ? (
            <div className="loading-container">데이터 로딩 중...</div>
          ) : (
            <div className="options-row">
              <div className="option-column">
                {[...new Set(optionsData['기후'])].map((option) => (
                  <div className="option-item" key={option}>
                    <input
                      type="checkbox"
                      id={`option-기후-${option}`}
                      checked={selectedOptions['기후'].includes(option)}
                      onChange={() => handleOptionChange('기후', option)}
                    />
                    <label htmlFor={`option-기후-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
              <div className="option-column">
                {[...new Set(optionsData['환경'])].map((option) => (
                  <div className="option-item" key={option}>
                    <input
                      type="checkbox"
                      id={`option-환경-${option}`}
                      checked={selectedOptions['환경'].includes(option)}
                      onChange={() => handleOptionChange('환경', option)}
                    />
                    <label htmlFor={`option-환경-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
              <div className="option-column">
                {[...new Set(optionsData['질병'])].map((option) => (
                  <div className="option-item" key={option}>
                    <input
                      type="checkbox"
                      id={`option-질병-${option}`}
                      checked={selectedOptions['질병'].includes(option)}
                      onChange={() => handleOptionChange('질병', option)}
                    />
                    <label htmlFor={`option-질병-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 지역 토글 렌더링
  const renderRegionToggle = () => {
    if (activeToggle !== '지역') return null;
    return (
      <div className="region-toggle-content">
        <div className="region-options-grid">
          {isDataLoading ? (
            <div className="loading-container">데이터 로딩 중...</div>
          ) : (
            regionsData.map((regionObj) => (
              <div key={regionObj.regionName} className="region-option">
                <input
                  type="checkbox"
                  id={`region-${regionObj.regionName}`}
                  checked={selectedRegions.includes(regionObj.regionName)}
                  onChange={() => handleRegionChange(regionObj.regionName)}
                />
                <label htmlFor={`region-${regionObj.regionName}`}>
                  {regionObj.regionName}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // 기간 토글 렌더링
  const renderPeriodToggle = () => {
    if (activeToggle !== '기간') return null;
    return (
      <div className="period-toggle-content">
        <div className="period-inputs-container">
          <div className="period-input-group">
            <label htmlFor="period-start">시작 기간</label>
            <input
              style={{ width: '515px' }}
              id="period-start"
              type="date"
              value={period.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="date-picker"
            />
          </div>
          <span className="period-separator">~</span>
          <div className="period-input-group">
            <label htmlFor="period-end">종료 기간</label>
            <input
              style={{ width: '515px' }}
              id="period-end"
              type="date"
              value={period.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="date-picker"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="data-analysis-container">
      <h1 className="page-title">데이터 분석</h1>
      <div className="instruction">
        <span className="bullet">■</span> 카테고리를 1~2개 선택해주세요
      </div>
      <div className="analysis-section">
        <div className="toggle-buttons">
          <div className="category_wrap">
            <button
              className={`toggle-button ${
                activeToggle === '카테고리' ? 'active' : ''
              }`}
              onClick={() => handleToggle('카테고리')}
            >
              기후
            </button>
            <button
              className={`toggle-button ${
                activeToggle === '카테고리' ? 'active' : ''
              }`}
              onClick={() => handleToggle('카테고리')}
            >
              환경
            </button>
            <button
              className={`toggle-button ${
                activeToggle === '카테고리' ? 'active' : ''
              }`}
              onClick={() => handleToggle('카테고리')}
            >
              질병
            </button>
          </div>
          <div className="category_wrap">
            <button
              className={`toggle-button ${
                activeToggle === '지역' ? 'active' : ''
              }`}
              onClick={() => handleToggle('지역')}
            >
              지역
            </button>
            <button
              className={`toggle-button ${
                activeToggle === '기간' ? 'active' : ''
              }`}
              onClick={() => handleToggle('기간')}
            >
              기간
            </button>
            <button
              className="toggle-button analyze"
              onClick={handleAnalyze}
              disabled={isLoading}
            >
              {isLoading ? '분석 중...' : '분석'}
            </button>
          </div>
        </div>
        <div className={`toggle-content ${activeToggle ? 'active' : ''}`}>
          {renderCategoryToggle()}
          {renderRegionToggle()}
          {renderPeriodToggle()}
        </div>
      </div>
      <div className="results-and-chart">
        <div className="chart-container">
          <h3 className="chart-title">{analysisData.title}</h3>
          <div className="chart-placeholder">
            {/* 실제 그래프 데이터가 있을 때만 Analysis(ChartVisualization) 렌더 */}
            {analysisData.data ? (
              <Analysis analysisData={analysisData.data} />
            ) : (
              <div>분석 결과가 없습니다.</div>
            )}
          </div>
        </div>
        <div className="analysis-results">
          <h2 className="results-title">데이터 분석 결과</h2>
          <div className="selected-filters">
            <h3>선택된 필터</h3>
            <div className="filter-tags">
              {Object.entries(selectedOptions).map(([category, options]) =>
                options.map((option, idx) => (
                  <div key={`${category}-${idx}`} className="filter-tag">
                    <span className="filter-dot"></span>
                    <span>{option}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="selected-regions">
            <h3>선택된 지역</h3>
            <div className="filter-tags">
              {selectedRegions.map((region, index) => (
                <div key={index} className="filter-tag">
                  <span className="filter-dot"></span>
                  <span>{region}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="analysis-period">
            <h3>분석 기간</h3>
            <p>
              {formatDateForDisplay(period.start)} ~{' '}
              {formatDateForDisplay(period.end)}
            </p>
          </div>
          <div className="key-findings">
            <h3>주요 발견</h3>
            {analysisData && analysisData.data && (
              <GptClimateAnalyzer
                jsonData={JSON.stringify(analysisData.data)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Danls;
