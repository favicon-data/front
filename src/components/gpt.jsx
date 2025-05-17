// import React, { useState, useEffect } from 'react';
// const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// const SYSTEM_PROMPT = `
// 1.너는 최고의 기후,환경,질병 전문가
// 2. 사용자가 그래프 데이터를 제공한 경우 사용자가 제공한 그래프 데이터를 분석해서 주요 인사이트를 뽑고 2~3줄로 요약(이때 인사이트는 데이터 간의 상관관계 위주)
// 3. 만약 사용자가 그래프 데이터 를 제공하는 것이 아니라 평문의 질문을 한 다면 기후,질병,환경에 대한 답변만 출력하고. 다른 질문은 도와줄 수 없다고 대답해야해
// `;

// async function gptRequest({ messages }) {
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages,
//       temperature: 0.2,
//       max_tokens: 400,
//     }),
//   });
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error?.message || 'OpenAI API 오류');
//   }
//   return response.json();
// }

// const GptClimateAnalyzer = ({ jsonData, onResult }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState('');

//   // 자동 분석 (jsonData가 바뀔 때마다)
//   useEffect(() => {
//     if (!jsonData) return;
//     let cancelled = false;

//     const analyze = async () => {
//       setError('');
//       setResult('');
//       try {
//         JSON.parse(jsonData);
//       } catch {
//         setError('유효한 JSON 형식이 아닙니다.');
//         return;
//       }
//       setLoading(true);
//       try {
//         const messages = [
//           { role: 'system', content: SYSTEM_PROMPT },
//           {
//             role: 'user',
//             content: `아래의 JSON 그래프 데이터를 분석해줘. 그리고 2줄로 요약해줘.\n\n${jsonData}`,
//           },
//         ];
//         const data = await gptRequest({ messages });
//         const content = data.choices?.[0]?.message?.content?.trim() || '';
//         if (!cancelled) {
//           setResult(content);
//           if (onResult) onResult(content);
//         }
//       } catch (err) {
//         if (!cancelled) setError(err.message);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     analyze();

//     // cleanup
//     return () => {
//       cancelled = true;
//     };
//   }, [jsonData, onResult]);

//   return (
//     <div>
//       {loading && <div>GPT 요약 중...</div>}
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {result && (
//         <div
//           style={{
//             // background: '#f4f4f4',
//             padding: 12,
//             borderRadius: 6,
//             marginTop: 12,
//             whiteSpace: 'pre-line',
//           }}
//         >
//           {result}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GptClimateAnalyzer;

import React, { useState, useEffect } from 'react';
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const SYSTEM_PROMPT = `
너는 최고의 기후, 환경, 질병 전문가야.
- 사용자가 그래프 데이터를 제공하면, 데이터 간의 상관관계 등 주요 인사이트를 뽑아 2~3줄로 요약해줘.
- 사용자가 평문 질문을 하면 기후, 질병, 환경에 대한 답변만 해주고, 그 외의 질문에는 "기후,환경,질병에 관한 질문만 가능합니다!"라고 답변해.
`;

async function gptRequest({ messages }) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.2,
      max_tokens: 400,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API 오류');
  }
  return response.json();
}

const GptClimateAnalyzer = ({ jsonData, onResult }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!jsonData) {
      setResult('');
      setError('');
      return;
    }
    let cancelled = false;

    const analyze = async () => {
      setError('');
      setResult('');
      let isJson = false;
      try {
        // jsonData가 JSON인지 판별
        JSON.parse(jsonData);
        isJson = true;
      } catch {
        isJson = false;
      }
      setLoading(true);
      try {
        const userPrompt = isJson
          ? `아래의 JSON 그래프 데이터를 분석해서 주요 인사이트(상관관계 위주)를 2~3줄로 요약해줘.\n\n${jsonData}`
          : jsonData; // 평문이면 그대로 전달

        const messages = [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ];
        const data = await gptRequest({ messages });
        const content = data.choices?.[0]?.message?.content?.trim() || '';
        if (!cancelled) {
          setResult(content);
          if (onResult) onResult(content);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    analyze();

    return () => {
      cancelled = true;
    };
  }, [jsonData, onResult]);

  return (
    <div>
      {loading && <div>GPT 요약 중...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && !result && (
        <div style={{ color: 'gray', marginTop: 12 }}>
          분석 결과가 없습니다.
        </div>
      )}
      {result && (
        <div
          style={{
            padding: 12,
            borderRadius: 6,
            marginTop: 12,
            whiteSpace: 'pre-line',
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
};

export default GptClimateAnalyzer;
