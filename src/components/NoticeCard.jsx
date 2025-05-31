import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Eye, Search } from 'lucide-react';

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      {
        noticeId: 1,
        title: 'Favicon에 오신 것을 환영합니다.',
        content:
          'Favicon 데이터 포털에 오신 것을 환영합니다. 다양한 환경, 기후, 질병 관련 데이터를 제공하고 있습니다.',
        createDate: '2024-11-13',
        view: 12,
        label: '일반',
      },
      {
        noticeId: 2,
        title: '새 공지사항 제목',
        content:
          '공지사항 내용입니다. 시스템 업데이트 및 새로운 기능에 대한 안내를 제공합니다.',
        createDate: '2025-05-23',
        view: 0,
        label: '일반',
      },
      {
        noticeId: 3,
        title: '시스템 점검 안내',
        content:
          '2025년 1월 15일 오전 2시부터 6시까지 시스템 점검이 예정되어 있습니다.',
        createDate: '2025-01-10',
        view: 45,
        label: '중요',
      },
      {
        noticeId: 4,
        title: '신규 데이터 추가 안내',
        content: '환경 분야의 새로운 데이터셋이 추가되었습니다.',
        createDate: '2025-01-05',
        view: 28,
        label: '일반',
      },
    ];

    setTimeout(() => {
      setNotices(mockData);
      setFilteredNotices(mockData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredNotices(notices);
    } else {
      const filtered = notices.filter(
        (notice) =>
          notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(filtered);
    }
  }, [searchTerm, notices]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="h-8 w-8 text-green-600" />
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontSize: '24px' }}
            >
              공지사항
            </h1>
          </div>
          <p className="text-gray-600">
            Favicon의 최신 소식과 공지사항을 확인하세요.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="공지사항 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              style={{ borderRadius: '0.75rem' }}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded overflow-hidden">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600">다른 키워드로 검색해보세요.</p>
            </div>
          ) : (
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-200 text-left">
                <tr style={{ backgroundColor: 'rgba(89, 116, 69, 0.1)' }}>
                  <th className="px-4 py-2 w-10">번호</th>
                  <th className="px-4 py-2 w-20">분류</th>
                  <th className="px-4 py-2 w-1/2">제목</th>
                  <th className="px-4 py-2 w-24">조회수</th>
                  <th className="px-4 py-2 w-32">등록일</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.map((notice) => (
                  <tr
                    key={notice.noticeId}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 font-semibold">
                      #{notice.noticeId}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          notice.label === '중요'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {notice.label}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="font-medium text-gray-900">
                        {notice.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {notice.content}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="h-4 w-4 mr-1" />
                        {notice.view}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(notice.createDate)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            총 {notices.length}개의 공지사항 중 {filteredNotices.length}개 표시
          </p>
        </div>
      </div>
    </div>
  );
}
