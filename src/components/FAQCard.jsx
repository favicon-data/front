import React, { useState, useEffect } from 'react';
import { HelpCircle, Search } from 'lucide-react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      {
        faqId: 1,
        category: '서비스이용',
        question: '서비스 이용 방법이 궁금합니다.',
        answer: "홈페이지 상단 '이용안내' 메뉴를 참고해주세요.",
      },
      {
        faqId: 2,
        category: '데이터',
        question: '데이터를 다운로드하는 방법은 무엇인가요?',
        answer:
          "각 데이터 상세 페이지에서 '다운로드' 버튼을 클릭하시면 됩니다. 회원가입 후 이용 가능합니다.",
      },
      {
        faqId: 3,
        category: '계정',
        question: '비밀번호를 잊어버렸어요.',
        answer:
          "로그인 페이지에서 '비밀번호 찾기'를 클릭하여 이메일로 재설정 링크를 받으실 수 있습니다.",
      },
      {
        faqId: 4,
        category: '서비스이용',
        question: '데이터 요청은 어떻게 하나요?',
        answer:
          "'데이터 요청' 메뉴에서 필요한 데이터 정보를 입력하여 요청하실 수 있습니다.",
      },
    ];

    setTimeout(() => {
      setFaqs(mockData);
      setFilteredFaqs(mockData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm, faqs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">FAQ 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="h-8 w-8 text-green-600" />
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontSize: '24px' }}
            >
              자주 묻는 질문
            </h1>
          </div>
          <p className="text-gray-600">궁금한 내용을 검색해보세요.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="FAQ 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              style={{ borderRadius: '0.75rem' }}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600">다른 키워드로 검색해보세요.</p>
            </div>
          ) : (
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-200 text-left">
                <tr style={{ backgroundColor: 'rgba(89, 116, 69, 0.1)' }}>
                  <th className="px-4 py-2 w-20">번호</th>
                  <th className="px-4 py-2 w-30">분류</th>
                  <th className="px-4 py-2 w-1/3">질문</th>
                  <th className="px-4 py-2">답변</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaqs.map((faq) => (
                  <tr key={faq.faqId} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">
                      FAQ #{faq.faqId}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            faq.category === '서비스이용'
                              ? 'bg-green-100'
                              : faq.category === '데이터'
                              ? 'bg-blue-100'
                              : faq.category === '계정'
                              ? 'bg-red-100'
                              : 'bg-gray-100'
                          } text-gray-800`}
                      >
                        {faq.category}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-medium">{faq.question}</td>
                    <td className="px-4 py-2 text-sm">{faq.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            총 {faqs.length}개의 FAQ 중 {filteredFaqs.length}개 표시
          </p>
        </div>
      </div>
    </div>
  );
}
