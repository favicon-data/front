import React, { useState } from 'react';
import '../Danls.css';

const CATEGORIES = [
  { key: '기후', label: '기후' },
  { key: '환경', label: '환경' },
  { key: '질병', label: '질병' },
  { key: '지역', label: '지역' },
  { key: '기간', label: '기간' },
];

function DataAnalysisLayout() {
  const [openCategory, setOpenCategory] = useState(null);
  const [subCategories, setSubCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({
    기후: [],
    환경: [],
    질병: [],
    지역: [],
    기간: { from: '', to: '' },
  });
  const [chartData, setChartData] = useState(null);

  // 카테고리 토글
  const handleCategoryClick = async (categoryKey) => {
    if (openCategory === categoryKey) {
      setOpenCategory(null);
      setError(null);
      return;
    }
    setOpenCategory(categoryKey);
    setError(null);
    if (categoryKey === '기간') return;
    if (subCategories[categoryKey]) return;
    setLoading(true);
    try {
      const res = await fetch(
        'http://54.180.238.119:8080/data-set/group-by-theme'
      );
      const data = await res.json();
      setSubCategories((prev) => ({
        ...prev,
        기후: data['기후'] || [],
        환경: data['환경'] || [],
        질병: data['질병'] || [],
        지역: data['지역'] || [],
      }));
    } catch (e) {
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 체크박스 선택
  const handleCheckbox = (category, value) => {
    setSelected((prev) => {
      const prevArr = prev[category];
      if (prevArr.includes(value)) {
        return { ...prev, [category]: prevArr.filter((v) => v !== value) };
      } else if (prevArr.length < 2) {
        return { ...prev, [category]: [...prevArr, value] };
      }
      return prev;
    });
  };

  // 기간 변경
  const handlePeriodChange = (type, value) => {
    setSelected((prev) => ({
      ...prev,
      기간: { ...prev.기간, [type]: value },
    }));
  };

  // 분석 버튼 클릭 시 Python 서버로 데이터 전송
  const handleAnalyze = async () => {
    // 보낼 데이터 구조 예시
    //여기  post구조에 맞게 수정해야함
    const themeCandidates = [
      selected.기후,
      selected.환경,
      selected.질병,
    ].filter(Boolean); // 값이 있는 것만 추출

    const [theme1, theme2] = themeCandidates;
    const payload = {
      theme1,
      theme2,
      region: selected.지역,
      period: selected.기간,
    };
    console.log(payload);
    try {
      const res = await fetch('http://54.180.238.119:8080/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('서버 오류');
      const data = await res.json();
      // 예시: 서버에서 분석 결과(그래프 데이터 등) 반환
      setChartData(data.chart); // chart: [숫자, ...]
    } catch (e) {
      setError('분석 요청에 실패했습니다.');
    }
  };

  return (
    <div className="dal-root">
      <h3 className="dal-title">데이터 분석</h3>
      <div className="dal-category-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`dal-cat-btn${
              openCategory === cat.key ? ' active' : ''
            }`}
            onClick={() => handleCategoryClick(cat.key)}
          >
            {cat.label}
          </button>
        ))}
        <button className="dal-analyze-btn" onClick={handleAnalyze}>
          분석
        </button>
      </div>
      {openCategory && (
        <div className="dal-options-box">
          {loading && <div>로딩중...</div>}
          {error && <div className="dal-error">{error}</div>}
          {['기후', '환경', '질병', '지역'].includes(openCategory) &&
            subCategories[openCategory] && (
              <div className="dal-checkbox-list">
                {subCategories[openCategory].length === 0 ? (
                  <div>데이터 없음</div>
                ) : (
                  subCategories[openCategory].map((item) => (
                    <label key={item} className="dal-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selected[openCategory].includes(item)}
                        onChange={() => handleCheckbox(openCategory, item)}
                        disabled={
                          !selected[openCategory].includes(item) &&
                          selected[openCategory].length >= 2
                        }
                      />
                      {item}
                    </label>
                  ))
                )}
              </div>
            )}
          {openCategory === '기간' && (
            <div className="dal-period-box">
              <input
                type="month"
                value={selected.기간.from}
                onChange={(e) => handlePeriodChange('from', e.target.value)}
              />
              <span>~</span>
              <input
                type="month"
                value={selected.기간.to}
                onChange={(e) => handlePeriodChange('to', e.target.value)}
              />
            </div>
          )}
        </div>
      )}
      {chartData && (
        <div className="dal-chart-area">
          <BarChart data={chartData} />
          <div className="dal-result-info">
            <div>데이터 분석 결과</div>
            <div>데이터 상세정보</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 예시 바차트 (실제 라이브러리로 대체 가능)
function BarChart({ data }) {
  return (
    <svg
      width="500"
      height="300"
      style={{ background: '#fafafa', borderRadius: 8 }}
    >
      {data.map((v, i) => (
        <rect
          key={i}
          x={i * 80 + 30}
          y={300 - v}
          width={50}
          height={v}
          fill="#78905b"
        />
      ))}
    </svg>
  );
}

export default DataAnalysisLayout;
