import React, { useState, useEffect } from 'react';
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const SYSTEM_PROMPT = `
너는 최고의 기후, 환경, 질병 전문가야.
- 사용자가 데이터를 제공하면, 데이터 간의 상관관계 등 주요 인사이트를 뽑아 2~3줄로 요약해줘.(이때 시작은 그래프를 분석한 결과~ 이런식으로 해야함)
- 입력한 데이터가 너무 길면 허용치까지만 받아들여서 중복 되는 내용은 제거하고 각 그래프별 판단이 아니라 그냥 선택된 데이터간의 상관관계등 주요 인사이트만 뽑아서 출력해
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
            // padding: 12,
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
