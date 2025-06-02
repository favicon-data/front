// src/pages/FAQPage.jsx

import React from 'react';
import FAQCard from '../components/FAQCard'; // 상대 경로로 수정
import faqData from '../data/faq.json'; // JSON 파일 import

export default function FAQPage() {
  return (
    <div className="p-4">
      {/*<h1 className="text-2xl font-bold mb-4">자주 묻는 질문</h1>*/}
      <div className="space-y-4">
        {faqData.map((faq) => (
          <FAQCard key={faq.faqId} faq={faq} />
        ))}
      </div>
    </div>
  );
}
