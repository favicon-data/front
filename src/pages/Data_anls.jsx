import React, { useState } from 'react';
import '../Danls.css';

// y축 최대 선택 개수
const MAX_Y_AXIS = 2;

// 더미 데이터 예시
const dummyDataList = [
  { id: 1, name: '서울 일평균 기온' },
  { id: 2, name: '서울 일강수량' },
  { id: 3, name: '서울 미세먼지 (PM10)' },
  { id: 4, name: '서울 바람속도' },
  { id: 5, name: '서울 습도' },
  { id: 6, name: '서울 일조시간' },
];

// 기간 옵션 생성 (2021.06 ~ 2024.06)
const getMonthOptions = () => {
  const result = [];
  for (let y = 2021; y <= 2024; y++) {
    const mStart = y === 2021 ? 6 : 1;
    const mEnd = y === 2024 ? 6 : 12;
    for (let m = mStart; m <= mEnd; m++) {
      result.push(`${y}.${String(m).padStart(2, '0')}`);
    }
  }
  return result;
};

function DataAnalysisLayout() {
  const [showSearch, setShowSearch] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [yAxisList, setYAxisList] = useState([]);
  const [period, setPeriod] = useState({ from: '', to: '' });

  // y축 설정 버튼 클릭
  const handleYAxisClick = () => {
    if (yAxisList.length < MAX_Y_AXIS) setShowSearch(true);
  };

  // 검색
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    if (keyword.trim()) {
      setSearchResults(
        dummyDataList.filter((item) => item.name.includes(keyword))
      );
    } else {
      setSearchResults([]);
    }
  };

  // 검색 결과 선택
  const handleSelectSearch = (item) => {
    if (yAxisList.length < MAX_Y_AXIS) {
      setYAxisList([...yAxisList, item]);
      setShowSearch(false);
      setSearchKeyword('');
      setSearchResults([]);
    }
  };

  // 기간 설정 버튼 클릭
  const handlePeriodClick = () => setShowPeriod(true);

  // 기간 선택
  const handlePeriodSelect = (from, to) => {
    setPeriod({ from, to });
    setShowPeriod(false);
  };

  return (
    <div className="analysis-root">
      <h3 className="analysis-title">데이터 분석</h3>
      <div style={{ marginLeft: '80px' }}>
        <div className="analysis-desc">
          분석할 데이터를 선택하거나 그래프를 통해 분석된 데이터를 확인해보세요
        </div>
        <div className="analysis-btn-row">
          <button className="analysis-btn" onClick={handlePeriodClick}>
            기간 설정
          </button>
          <button
            className="analysis-btn"
            onClick={handleYAxisClick}
            disabled={yAxisList.length >= MAX_Y_AXIS}
          >
            y축 설정
          </button>
        </div>
        <div className="analysis-yaxis-list">
          {yAxisList.map((item) => (
            <span className="analysis-yaxis-chip" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
        <div className="resultWrapper">
          <div className="analysis-graph-placeholder" />
          <div className="analysis-result-box">
            <div className="result-title">선택한 데이터</div>
            <div className="result-info">
              기간:{' '}
              {period.from && period.to
                ? `${period.from} ~ ${period.to}`
                : '2021-06~2024-06'}
            </div>
            <div className="result-info">
              y축:{' '}
              {yAxisList.length > 0
                ? yAxisList.map((item) => item.name).join(', ')
                : '미설정'}
            </div>
            <div className="result-hint">* y축 최대 2개까지 설정 가능</div>
          </div>
        </div>

        {/* y축 검색 오버레이 */}
        {showSearch && (
          <div className="overlay-bgs">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="데이터 검색"
              className="search-input"
            />
            <ul className="search-list">
              {searchResults.map((item) => (
                <li
                  className="search-item"
                  key={item.id}
                  onClick={() => handleSelectSearch(item)}
                >
                  {item.name}
                </li>
              ))}
              {searchKeyword && searchResults.length === 0 && (
                <li className="search-empty">검색 결과 없음</li>
              )}
            </ul>
          </div>
        )}

        {/* 기간 설정 오버레이 */}
        {showPeriod && (
          <PeriodOverlay
            onSelect={handlePeriodSelect}
            onClose={() => setShowPeriod(false)}
          />
        )}
      </div>
    </div>
  );
}

// 기간 오버레이 컴포넌트
function PeriodOverlay({ onSelect, onClose }) {
  const options = getMonthOptions();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <div className="overlay-bg" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="period-title">기간 설정</div>
        <div className="period-row">
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">시작 연월</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">종료 연월</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button
          className="period-btn"
          onClick={() => onSelect(from, to)}
          disabled={!from || !to}
        >
          선택
        </button>
        <button className="period-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default DataAnalysisLayout;
