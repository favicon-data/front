import React from 'react';
import Plot from 'react-plotly.js';

//  Base64 문자열을 Float64Array로 변환

function decodeBase64ToFloatArray(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Float64Array(bytes.buffer);
}

/**
 * ChartVisualization 컴포넌트
 * @param {Array} data - 서버에서 받은 data 배열 (예: [{x, y: {bdata}, ...}, ...])
 * @param {string} title - 그래프 제목 (Danls.jsx에서 동적으로 전달)
 */
const ChartVisualization = ({ data, title }) => {
  if (!data || data.length < 2) return <div>데이터가 없습니다.</div>;

  // 첫 번째 데이터
  const firstData = data[0];
  // 두 번째 데이터
  const secondData = data[1];

  // Base64 → y값 변환
  const firstY = decodeBase64ToFloatArray(firstData.y.bdata);
  const secondY = decodeBase64ToFloatArray(secondData.y.bdata);

  return (
    <Plot
      data={[
        {
          x: firstData.x,
          y: Array.from(firstY),
          type: 'bar',
          name: firstData.name,
          marker: { color: firstData.marker?.color },
        },
        {
          x: secondData.x,
          y: Array.from(secondY),
          type: 'scatter',
          mode: 'lines+markers',
          name: secondData.name,
          line: {
            color: secondData.line?.color,
            width: secondData.line?.width,
          },
          marker: {
            color: secondData.marker?.color,
            size: secondData.marker?.size,
          },
          yaxis: 'y2',
        },
      ]}
      layout={{
        title: title,
        xaxis: {
          title: '연도',
          tickfont: { size: 12 },
          showgrid: true,
          gridcolor: 'lightgrey',
        },
        yaxis: {
          title: firstData.yaxisTitle || '1번 데이터',
          tickfont: { size: 12 },
          showgrid: true,
          gridcolor: 'lightgrey',
        },
        yaxis2: {
          title: secondData.yaxisTitle || '2번 데이터',
          overlaying: 'y',
          side: 'right',
          showgrid: false,
          tickfont: { size: 12 },
        },
        legend: {
          font: { size: 14 },
          xanchor: 'center',
          x: 0.5,
          yanchor: 'top',
          orientation: 'h',
        },
        margin: { l: 50, r: 50, t: 80, b: 80 },
        width: 1000,
        height: 400,
        plot_bgcolor: 'white',
      }}
      config={{
        responsive: true,
        displayModeBar: true,
      }}
    />
  );
};

export default ChartVisualization;
