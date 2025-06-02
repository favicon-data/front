// src/pages/NoticePage.jsx

import React from 'react';
import NoticeCard from '../components/NoticeCard'; // 상대경로로 import
import noticeData from '../data/notice.json';      // JSON 불러오기

export default function NoticePage() {
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">공지사항</h1> */}
      <div className="space-y-4">
        {noticeData.map((notice) => (
          <NoticeCard key={notice.noticeId} notice={notice} />
        ))}
      </div>
    </div>
  );
}
