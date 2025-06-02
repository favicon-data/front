import React from 'react';
import Plot from 'react-plotly.js';
import '../Analysis.css';

// bdata(base64) → TypedArray → JS 배열 변환 (기존과 동일)
function decodeBdata(obj) {
  if (!obj || typeof obj !== 'object' || !obj.bdata) return obj;
  const binary = atob(obj.bdata);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);
  switch (obj.dtype) {
    case 'f8':
      return Array.from(new Float64Array(buffer));
    case 'f4':
      return Array.from(new Float32Array(buffer));
    case 'i4':
      return Array.from(new Int32Array(buffer));
    case 'u4':
      return Array.from(new Uint32Array(buffer));
    case 'i2':
      return Array.from(new Int16Array(buffer));
    case 'u2':
      return Array.from(new Uint16Array(buffer));
    case 'i1':
      return Array.from(new Int8Array(buffer));
    case 'u1':
      return Array.from(new Uint8Array(buffer));
    default:
      return obj;
  }
}

function convertPlotlyData(dataArr) {
  if (!Array.isArray(dataArr)) return [];
  return dataArr.map((trace) => {
    const newTrace = { ...trace };
    if (trace.x && typeof trace.x === 'object' && trace.x.bdata)
      newTrace.x = decodeBdata(trace.x);
    if (trace.y && typeof trace.y === 'object' && trace.y.bdata)
      newTrace.y = decodeBdata(trace.y);
    if (trace.z && typeof trace.z === 'object' && trace.z.bdata)
      newTrace.z = decodeBdata(trace.z);
    return newTrace;
  });
}

function normalizeAxisTitle(axis) {
  if (!axis) return axis;
  return {
    ...axis,
    title:
      axis.title && typeof axis.title === 'object' && axis.title.text
        ? axis.title.text
        : axis.title,
  };
}

const ChartVisualization = ({ graph, title }) => {
  if (
    !graph ||
    !graph.data ||
    !Array.isArray(graph.data) ||
    graph.data.length === 0 ||
    !graph.layout
  ) {
    return <div>그래프 데이터가 없습니다.</div>;
  }

  // bdata 디코딩 처리
  const traces = convertPlotlyData(graph.data);

  // 레이아웃 복제 (타이틀 덮어쓰기 가능)
  let layout = { ...graph.layout };
  if (title) {
    layout.title = title; // props로 전달된 타이틀 우선
  } else if (layout.title && typeof layout.title === 'object') {
    layout.title = layout.title.text; // 객체 형식 타이틀 처리
  }

  // x/yaxis title 정규화 (옵션)
  if (layout.xaxis) layout.xaxis = normalizeAxisTitle(layout.xaxis);
  if (layout.yaxis) layout.yaxis = normalizeAxisTitle(layout.yaxis);

  // 모든 trace를 그대로 사용
  const plotlyData = traces;

  return (
    <Plot
      data={plotlyData}
      layout={layout}
      config={{
        responsive: true,
        displayModeBar: true,
      }}
      style={{
        // width: layout.width || 1000,
        // height: layout.height || 600,
        width: 1050,
        height: 450,
        maxWidth: 1050,
        maxHeight: 450,
      }}
    />
  );
};

const Analysis = ({ analysisData }) => {
  if (
    !analysisData ||
    !analysisData.data ||
    !Array.isArray(analysisData.data) ||
    analysisData.data.length === 0 ||
    !analysisData.layout
  ) {
    return <div>그래프 데이터가 없습니다.</div>;
  }

  return <ChartVisualization graph={analysisData} />;
};

export default Analysis;
