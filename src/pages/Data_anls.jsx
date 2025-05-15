// 'use client';

import { useState, useEffect } from 'react';
import '../Danls.css';

const Danls = () => {
  // 토글 상태 관리
  const [activeToggle, setActiveToggle] = useState(null);

  // 선택된 옵션 상태
  const [selectedOptions, setSelectedOptions] = useState({
    기후: [],
    환경: [],
    질병: [],
  });

  // 서버에서 가져온 옵션 데이터
  const [optionsData, setOptionsData] = useState({
    기후: [],
    환경: [],
    질병: [],
  });

  // 선택된 지역 상태
  const [selectedRegions, setSelectedRegions] = useState([]);

  // 지역 데이터
  const [regionsData, setRegionsData] = useState([]);

  // 기간 상태
  const [period, setPeriod] = useState({
    start: '2014-01',
    end: '2024-01',
  });

  // 분석 결과 데이터 상태
  const [analysisData, setAnalysisData] = useState({
    title: '경기 지역 기온과 미세먼지 데이터 비교',
    selectedFilters: [
      { category: '기후', option: '기온' },
      { category: '환경', option: '미세먼지' },
    ],
    period: '2018년 08월 01일 ~ 2019년 05월 31일',
    findings:
      '선택하신 기간 동안 기온과 미세먼지 사이에 양의 상관관계(0.78)가 발견되었습니다. 특히 4월에 가장 높은 수치를 보였습니다.',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // 서버에서 옵션 데이터 가져오기
  useEffect(() => {
    const fetchOptionsData = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch(
          'http://54.180.238.119:8080/data-set/group-by-theme'
        );
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }

        const data = await response.json();

        // 서버 응답 데이터 구조에 맞게 처리
        if (data.기후 && data.환경 && data.질병) {
          setOptionsData({
            기후: data.기후,
            환경: data.환경,
            질병: data.질병,
          });
        }
        // if (data.regions) {
        //   setRegionsData(data.regions);
        // }

        setIsDataLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setIsDataLoading(false);

        // 오류 발생 시 기본 데이터 설정
        setOptionsData({
          기후: ['기온'],
          환경: ['미세먼지'],
          질병: ['감기'],
        });

        setRegionsData(['경기', '강원', '서울', '부산', '대구', '인천']);
      }
    };

    fetchOptionsData();
  }, []);
  //지역 선택
  useEffect(() => {
    const fetchRegionsData = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch('http://54.180.238.119:8080/region');
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }
        const data = await response.json();

        // [{regionName: "서울"}, ...] 형태이므로 아래처럼 처리
        if (Array.isArray(data)) {
          setRegionsData(data);
        }
        setIsDataLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setIsDataLoading(false);

        // fallback: 객체 배열로 맞춤
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

  // 토글 핸들러
  const handleToggle = (toggleName) => {
    setActiveToggle(activeToggle === toggleName ? null : toggleName);
  };

  // 총 선택된 옵션 개수 계산
  const getTotalSelectedOptions = () => {
    return Object.values(selectedOptions).reduce(
      (total, options) => total + options.length,
      0
    );
  };

  // 옵션 선택 핸들러
  const handleOptionChange = (category, option) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };

      // 이미 선택된 옵션인 경우 제거
      if (updated[category].includes(option)) {
        updated[category] = updated[category].filter((opt) => opt !== option);
        return updated;
      }

      // 새 옵션 추가 (최대 2개까지만 선택 가능)
      const totalSelected = getTotalSelectedOptions();
      if (totalSelected >= 2) {
        alert('옵션은 최대 2개까지만 선택할 수 있습니다.');
        return prev;
      }

      updated[category] = [...updated[category], option];
      return updated;
    });
  };

  // 지역 선택 핸들러
  const handleRegionChange = (regionName) => {
    setSelectedRegions((prev) => {
      if (prev.includes(regionName)) {
        return prev.filter((r) => r !== regionName);
      } else {
        return [...prev, regionName];
      }
    });
  };

  // 날짜 형식 변환 (YYYY-MM -> YYYY.MM)
  const formatDateForDisplay = (dateString) => {
    return dateString.replace('-', '.');
  };

  // 날짜 변경 핸들러
  const handleDateChange = (type, value) => {
    setPeriod((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // 분석 실행 핸들러
  const handleAnalyze = async () => {
    if (getTotalSelectedOptions() === 0 || selectedRegions.length === 0) {
      alert('옵션과 지역을 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setActiveToggle(null); // 분석 시 토글 닫기

    try {
      // 분석 요청 데이터 구성
      const requestData = {
        options: selectedOptions,
        regions: selectedRegions,
        period: {
          start: formatDateForDisplay(period.start),
          end: formatDateForDisplay(period.end),
        },
      };

      // 서버로 분석 요청
      // const response = await fetch('http://54.180.238.119:8080/analyze', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestData),
      // });
      // const data = await response.json();
      // setAnalysisData(data);

      // 임시 응답 데이터 (실제 구현에서는 제거)
      setTimeout(() => {
        // 선택된 모든 옵션을 하나의 배열로 변환
        const allSelectedOptions = Object.entries(selectedOptions).flatMap(
          ([category, options]) =>
            options.map((option) => ({ category, option }))
        );

        setAnalysisData({
          title: `${selectedRegions.join(', ')} 지역 ${allSelectedOptions
            .map((item) => item.option)
            .join(', ')} 데이터 비교`,
          selectedFilters: allSelectedOptions,
          period: `${formatDateForDisplay(
            period.start
          )}년 01일 ~ ${formatDateForDisplay(period.end)}년 31일`,
          findings:
            '선택하신 기간 동안 기온과 미세먼지 사이에 양의 상관관계(0.78)가 발견되었습니다. 특히 4월에 가장 높은 수치를 보였습니다.',
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('분석 중 오류 발생:', error);
      setIsLoading(false);
    }
  };

  // 옵션이나 지역이 변경될 때마다 분석 결과 업데이트
  useEffect(() => {
    const allSelectedOptions = Object.entries(selectedOptions).flatMap(
      ([category, options]) => options.map((option) => ({ category, option }))
    );

    if (allSelectedOptions.length > 0) {
      setAnalysisData({
        title: `${selectedRegions.join(', ')} 지역 ${allSelectedOptions
          .map((item) => item.option)
          .join(', ')} 데이터 비교`,
        selectedFilters: allSelectedOptions,
        period: `${formatDateForDisplay(
          period.start
        )}년 01일 ~ ${formatDateForDisplay(period.end)}년 31일`,
        findings:
          '선택하신 기간 동안 기온과 미세먼지 사이에 양의 상관관계(0.78)가 발견되었습니다. 특히 4월에 가장 높은 수치를 보였습니다.',
      });
    }
  }, [selectedOptions, selectedRegions, period]);

  // 카테고리 토글 렌더링
  const renderCategoryToggle = () => {
    if (activeToggle !== '카테고리') return null;

    return (
      <div className="categories-container">
        <div className="category-headers">
          <div className="category-header">기후</div>
          <div className="category-header">환경</div>
          <div className="category-header">질병</div>
        </div>
        <div className="options-container">
          {isDataLoading ? (
            <div className="loading-container">데이터 로딩 중...</div>
          ) : (
            <div className="options-row">
              {/* 기후 옵션 */}
              <div className="option-column">
                {optionsData['기후']?.map((option) => (
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
              {/* 환경 옵션 */}
              <div className="option-column">
                {optionsData['환경']?.map((option) => (
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
              {/* 질병 옵션 */}
              <div className="option-column">
                {optionsData['질병']?.map((option) => (
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

  // 기간 토글 렌더링 (달력 선택 방식으로 변경)
  const renderPeriodToggle = () => {
    if (activeToggle !== '기간') return null;

    return (
      <div className="period-toggle-content">
        <div className="period-inputs-container">
          <div className="period-input-group">
            <label htmlFor="period-start">시작 기간</label>
            <input
              id="period-start"
              type="month"
              value={period.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="date-picker"
            />
          </div>
          <span className="period-separator">~</span>
          <div className="period-input-group">
            <label htmlFor="period-end">종료 기간</label>
            <input
              id="period-end"
              type="month"
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
      <div className="breadcrumb">
        <span>홈</span>
        <span className="separator">&gt;</span>
        <span className="current">데이터 분석</span>
      </div>

      <h1 className="page-title">데이터 분석</h1>

      <div className="instruction">
        <span className="bullet">■</span> 카테고리를 1~2개 선택해주세요
      </div>

      <div className="analysis-section">
        <div className="toggle-buttons">
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

        {/* 토글 내용 */}
        <div className={`toggle-content ${activeToggle ? 'active' : ''}`}>
          {renderCategoryToggle()}
          {renderRegionToggle()}
          {renderPeriodToggle()}
        </div>
      </div>

      <div className="results-and-chart">
        {/* 그래프 영역 (비워둠) */}
        <div className="chart-container">
          <h3 className="chart-title">{analysisData.title}</h3>
          <div className="chart-placeholder">{/* 그래프는 추후 구현 */}</div>
        </div>

        {/* 분석 결과 영역 */}
        <div className="analysis-results">
          <h2 className="results-title">데이터 분석 결과</h2>

          <div className="selected-filters">
            <h3>선택된 필터</h3>
            <div className="filter-tags">
              {/* 카테고리별 선택된 옵션 표시 */}
              {Object.entries(selectedOptions).map(([category, options]) =>
                options.map((option, idx) => (
                  <div key={`${category}-${idx}`} className="filter-tag">
                    <span className="filter-category">{category}</span>
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
            <p>{analysisData.findings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Danls;
