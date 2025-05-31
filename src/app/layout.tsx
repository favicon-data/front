// import React, { Suspense } from 'react';
// import '../index.css';
// // import { Inter } from '../fonts/interFonts.js';
// import { ThemeProvider } from '../components/theme-provider.tsx';
// import { Button } from '../components/ui/button.tsx';
// import { Input } from '../components/ui/input.tsx';
// import {
//   Search,
//   Database,
//   BarChart2,
//   FileQuestion,
//   BookOpen,
//   Bookmark,
//   MessageSquare,
//   ChevronRight,
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Favicon - 기후, 환경, 질병 데이터',
//   description:
//     '기후, 환경, 질병 관련 데이터를 검색하고 활용할 수 있는 데이터 포털입니다.',
// };

// // 샘플 북마크 데이터
// const bookmarkData = {
//   climate: [
//     { id: 1, title: '전국 기온 변화 데이터', date: '2023-04-15' },
//     { id: 2, title: '한반도 강수량 분석', date: '2023-04-10' },
//     { id: 3, title: '기후변화 예측 모델', date: '2023-03-28' },
//   ],
//   environment: [
//     { id: 4, title: '전국 미세먼지 농도 데이터', date: '2023-04-12' },
//     { id: 5, title: '수질 오염도 측정 데이터', date: '2023-04-05' },
//     { id: 6, title: '산림 생태계 모니터링', date: '2023-03-30' },
//   ],
//   disease: [
//     { id: 7, title: '코로나19 지역별 확진자 현황', date: '2023-04-18' },
//     { id: 8, title: '독감 발생률 추이 분석', date: '2023-04-08' },
//     { id: 9, title: '감염병 확산 예측 모델', date: '2023-03-25' },
//   ],
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     // <html lang="ko">
//     // <body className={Inter.className}>
//     <ThemeProvider
//     // attribute="class"
//     // defaultTheme="light"
//     // enableSystem
//     // disableTransitionOnChange
//     >
//       <div className="flex min-h-screen flex-col">
//         {/* 녹색 배너 - 최상단으로 이동 및 색상 변경
//           <div className="bg-green-800 py-2 text-center text-white font-medium">
//             지금 가입하고, 무료 분석 받아보세요!
//           </div>
//           */}

//         <header>
//           <div className="border-b bg-white">
//             <div className="container mx-auto px-4 py-3">
//               {/* 상단 메뉴 */}
//               <div className="flex justify-end mb-4 text-sm">
//                 <Link
//                   to="/signup"
//                   className="text-gray-600 hover:text-gray-900 mr-4"
//                 >
//                   회원가입
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="text-gray-600 hover:text-gray-900 mr-4"
//                 >
//                   로그인
//                 </Link>
//                 {/* 고객센터 드롭다운 메뉴 */}
//                 <div className="relative group">
//                   <Link
//                     to="/support"
//                     className="text-gray-600 hover:text-gray-900 flex items-center"
//                   >
//                     고객센터 ▾
//                   </Link>
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block hover:block">
//                     <Link
//                       to="/notice"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       공지사항
//                     </Link>
//                     <Link
//                       to="/faq"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       자주묻는질문
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* 로고와 검색창 - 검색창 중앙 배치 */}
//               <div className="flex flex-col md:flex-row items-center justify-between py-2">
//                 <div className="w-full md:w-1/4 mb-4 md:mb-0 flex justify-center md:justify-start md:pl-55">
//                   <Link to="/" className="flex items-center group">
//                     <div>
//                       <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
//                         Favicon
//                       </span>
//                       <div className="text-xs text-gray-500 mt-0.5">
//                         Flow & Vision Connection
//                       </div>
//                     </div>
//                   </Link>
//                 </div>

//                 {/* 검색창 - 중앙 배치 및 디자인 개선 */}
//                 {/* <div className="w-full md:w-1/3 px-4">
//                   <div className="flex shadow-md rounded-lg overflow-hidden">
//                     <div className="relative flex-grow">
//                       <Input
//                         type="search"
//                         className="h-[48px] py-2.5 text-base rounded-l-lg rounded-r-none border-r-0 border-gray-300 focus:ring-green-500 focus:border-green-500"
//                         placeholder="검색어를 입력해주세요."
//                       />
//                     </div>
//                     <Button className="h-[48px] px-4 rounded-l-none bg-green-700 hover:bg-green-800 transition-colors">
//                       <Search className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </div> */}

//                 {/* 우측 여백 - 북마크 아이콘 추가 */}
//                 <div className="w-full md:w-1/4 flex justify-center md:justify-end space-x-3">
//                   <Link to="/ai">
//                     <Button
//                       className="px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
//                       title="AI 챗봇으로 데이터 검색"
//                     >
//                       <MessageSquare className="h-5 w-5 mr-2" />
//                       <span>AI Chat</span>
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 메인 네비게이션 - 메뉴 배치 수정 */}
//           <div className="bg-white shadow-sm">
//             <div className="container mx-auto px-4">
//               <nav className="flex flex-wrap items-center">
//                 {/* 북마크 메뉴 - 왼쪽 배치 */}
//                 <div className="w-full md:w-1/5 flex justify-center md:justify-start relative group md:ml-4">
//                   <Link
//                     to="/bookmarks"
//                     className="ml-45 flex items-center py-4 px-5 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                   >
//                     <Bookmark className="h-5 w-5 mr-2" />
//                     <span>북마크</span>
//                   </Link>
//                   <div className="absolute left-45 top-full mt-1 w-64 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block hover:block">
//                     <div className="px-4 py-2 border-b border-gray-100">
//                       <h4 className="font-medium text-sm text-gray-800">
//                         북마크 리스트
//                       </h4>
//                     </div>

//                     {/* 기후 데이터 북마크 - 하위 메뉴 */}
//                     <div className="relative group/climate">
//                       <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                         <div className="flex items-center">
//                           <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                           기후 데이터 북마크
//                         </div>
//                         <ChevronRight className="h-4 w-4 text-gray-400" />
//                       </div>
//                       <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/climate:block hover:block ml-1">
//                         <div className="px-4 py-2 border-b border-gray-100">
//                           <h4 className="font-medium text-sm text-blue-600">
//                             기후 데이터 북마크
//                           </h4>
//                         </div>
//                         {bookmarkData.climate.map((item) => (
//                           <Link
//                             key={item.id}
//                             to={`/datasets/${item.id}`}
//                             className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             <span className="truncate">{item.title}</span>
//                             <span className="text-xs text-gray-500">
//                               {item.date}
//                             </span>
//                           </Link>
//                         ))}
//                         <div className="border-t border-gray-100 mt-1 pt-1">
//                           <Link
//                             to="/bookmarks/climate"
//                             className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-100"
//                           >
//                             모든 기후 북마크 보기
//                           </Link>
//                         </div>
//                       </div>
//                     </div>

//                     {/* 환경 데이터 북마크 - 하위 메뉴 */}
//                     <div className="relative group/environment">
//                       <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                         <div className="flex items-center">
//                           <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
//                           환경 데이터 북마크
//                         </div>
//                         <ChevronRight className="h-4 w-4 text-gray-400" />
//                       </div>
//                       <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/environment:block hover:block ml-1">
//                         <div className="px-4 py-2 border-b border-gray-100">
//                           <h4 className="font-medium text-sm text-green-600">
//                             환경 데이터 북마크
//                           </h4>
//                         </div>
//                         {bookmarkData.environment.map((item) => (
//                           <Link
//                             key={item.id}
//                             to={`/datasets/${item.id}`}
//                             className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             <span className="truncate">{item.title}</span>
//                             <span className="text-xs text-gray-500">
//                               {item.date}
//                             </span>
//                           </Link>
//                         ))}
//                         <div className="border-t border-gray-100 mt-1 pt-1">
//                           <Link
//                             to="/bookmarks/environment"
//                             className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
//                           >
//                             모든 환경 북마크 보기
//                           </Link>
//                         </div>
//                       </div>
//                     </div>

//                     {/* 질병 데이터 북마크 - 하위 메뉴 */}
//                     <div className="relative group/disease">
//                       <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                         <div className="flex items-center">
//                           <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
//                           질병 데이터 북마크
//                         </div>
//                         <ChevronRight className="h-4 w-4 text-gray-400" />
//                       </div>
//                       <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/disease:block hover:block ml-1">
//                         <div className="px-4 py-2 border-b border-gray-100">
//                           <h4 className="font-medium text-sm text-red-600">
//                             질병 데이터 북마크
//                           </h4>
//                         </div>
//                         {bookmarkData.disease.map((item) => (
//                           <Link
//                             key={item.id}
//                             to={`/datasets/${item.id}`}
//                             className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             <span className="truncate">{item.title}</span>
//                             <span className="text-xs text-gray-500">
//                               {item.date}
//                             </span>
//                           </Link>
//                         ))}
//                         <div className="border-t border-gray-100 mt-1 pt-1">
//                           <Link
//                             to="/bookmarks/disease"
//                             className="block px-4 py-2 text-sm text-red-600 font-medium hover:bg-gray-100"
//                           >
//                             모든 질병 북마크 보기
//                           </Link>
//                         </div>
//                       </div>
//                     </div>

//                     {/* 모든 북마크 보기 - 하위 메뉴 */}
//                     <div className="relative group/all border-t border-gray-100 mt-1 pt-1">
//                       <div className="flex items-center justify-between px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100 cursor-pointer">
//                         <span>모든 북마크 보기</span>
//                         <ChevronRight className="h-4 w-4 text-gray-400" />
//                       </div>
//                       <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/all:block hover:block ml-1">
//                         <div className="px-4 py-2 border-b border-gray-100">
//                           <h4 className="font-medium text-sm text-green-800">
//                             모든 북마크
//                           </h4>
//                         </div>
//                         {[
//                           ...bookmarkData.climate,
//                           ...bookmarkData.environment,
//                           ...bookmarkData.disease,
//                         ].map((item) => (
//                           <Link
//                             key={item.id}
//                             to={`/datasets/${item.id}`}
//                             className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           >
//                             <span className="truncate">{item.title}</span>
//                             <span className="text-xs text-gray-500">
//                               {item.date}
//                             </span>
//                           </Link>
//                         ))}
//                         <div className="border-t border-gray-100 mt-1 pt-1">
//                           <Link
//                             to="/bookmarks/all"
//                             className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
//                           >
//                             북마크 관리하기
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* 나머지 메뉴들 - 검색창 위치에 맞춰 중앙 배치 */}
//                 <div className="w-full md:w-3/5 px-4 flex justify-center gap-x-15">
//                   <Link
//                     to="/list"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                   >
//                     <Database className="h-5 w-5 mr-2" />
//                     <span>데이터 목록</span>
//                   </Link>
//                   <Link
//                     to="/anls"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                   >
//                     <BarChart2 className="h-5 w-5 mr-2" />
//                     <span>데이터 분석</span>
//                   </Link>
//                   <Link
//                     to="/bulletin"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                   >
//                     <FileQuestion className="h-5 w-5 mr-2" />
//                     <span>데이터 요청</span>
//                   </Link>
//                   <Link
//                     to="/manual"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                   >
//                     <BookOpen className="h-5 w-5 mr-2" />
//                     <span>이용안내</span>
//                   </Link>
//                 </div>

//                 {/* 우측 여백 */}
//                 <div className="w-full md:w-1/5 hidden md:block"></div>
//               </nav>
//             </div>
//           </div>
//         </header>
//         <Suspense>{children}</Suspense>
//         <footer className="mt-auto bg-gray-100 border-t">
//           <div className="container mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               <div>
//                 <h3 className="font-bold text-lg mb-4">Favicon</h3>
//                 <p className="text-gray-600">
//                   기후, 환경, 질병 관련 데이터를 한눈에 제공하는 데이터
//                   포털입니다.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="font-bold text-lg mb-4">카테고리</h3>
//                 <ul className="space-y-2">
//                   <li>
//                     <a
//                       href="/list?category=기후"
//                       className="text-gray-600 hover:text-gray-900"
//                     >
//                       기후
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/list?category=환경"
//                       className="text-gray-600 hover:text-gray-900"
//                     >
//                       환경
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/list?category=질병"
//                       className="text-gray-600 hover:text-gray-900"
//                     >
//                       질병
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-bold text-lg mb-4">정보</h3>
//                 <ul className="space-y-2">
//                   <li>
//                     <a
//                       href="/about"
//                       className="text-gray-600 hover:text-gray-900"
//                     >
//                       소개
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/terms"
//                       className="text-gray-600 hover:text-gray-900"
//                     >
//                       이용약관
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/privacy"
//                       className="text-gray-600 hover:text-gray-900"
//                     >
//                       개인정보처리방침
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-bold text-lg mb-4">문의</h3>
//                 <p className="text-gray-600">
//                   이메일: contact@favicon.com
//                   <br />
//                   전화: 02-123-4567
//                 </p>
//               </div>
//             </div>
//             <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
//               © 2025 Favicon. All rights reserved.
//             </div>
//           </div>
//         </footer>
//       </div>
//     </ThemeProvider>
//     // </body>
//     // </html>
//   );
// }
import React, { useState, Suspense } from 'react';
import '../index.css';
import { ThemeProvider } from '../components/theme-provider.tsx';
import { Button } from '../components/ui/button.tsx';
import {
  Search,
  Database,
  BarChart2,
  FileQuestion,
  BookOpen,
  Bookmark,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logout_modal from '../components/Logout_modal.jsx';
import LOGO from '../components/images/logo.png';

// 샘플 북마크 데이터
const bookmarkData = {
  climate: [
    { id: 1, title: '전국 기온 변화 데이터', date: '2023-04-15' },
    { id: 2, title: '한반도 강수량 분석', date: '2023-04-10' },
    { id: 3, title: '기후변화 예측 모델', date: '2023-03-28' },
  ],
  environment: [
    { id: 4, title: '전국 미세먼지 농도 데이터', date: '2023-04-12' },
    { id: 5, title: '수질 오염도 측정 데이터', date: '2023-04-05' },
    { id: 6, title: '산림 생태계 모니터링', date: '2023-03-30' },
  ],
  disease: [
    { id: 7, title: '코로나19 지역별 확진자 현황', date: '2023-04-18' },
    { id: 8, title: '독감 발생률 추이 분석', date: '2023-04-08' },
    { id: 9, title: '감염병 확산 예측 모델', date: '2023-03-25' },
  ],
};

export default function RootLayout() {
  // 로그인 상태 및 사용자명 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [outModal, setoutModal] = useState(false);
  const navigate = useNavigate();

  // 로그아웃 핸들러
  const handleLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
    setoutModal(true);
    navigate('/'); // 홈으로 이동(선택)
  };

  // 모달창을 닫음
  const handleCloseModal = () => {
    setoutModal(false); // 모달창을 닫음
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <header>
          <div className="border-b bg-white">
            <div className="container mx-auto px-4 py-3">
              {/* 상단 메뉴 */}
              <div className="flex justify-end mb-4 text-sm">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/signup"
                      className="text-gray-600 hover:text-gray-900 mr-4"
                      style={{ fontSize: '15px' }}
                    >
                      회원가입
                    </Link>
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-gray-900 mr-4"
                      style={{ fontSize: '15px' }}
                    >
                      로그인
                    </Link>
                    {/* 고객센터 드롭다운 메뉴 */}
                    <div className="relative group">
                      <Link
                        to="/support"
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                        style={{ fontSize: '15px' }}
                      >
                        고객센터 ▾
                      </Link>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block hover:block">
                        <Link
                          to="/notice"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ fontSize: '15px' }}
                        >
                          공지사항
                        </Link>
                        <Link
                          to="/faq"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ fontSize: '15px' }}
                        >
                          자주묻는질문
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span
                      className="text-green-700 font-semibold mr-4"
                      style={{ fontSize: '15px' }}
                    >
                      {userName}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-900 mr-4"
                      style={{ fontSize: '15px' }}
                    >
                      로그아웃
                    </button>
                    <div className="relative group">
                      <Link
                        to="/support"
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                        style={{ fontSize: '15px', marginBottom: '0' }}
                      >
                        고객센터 ▾
                      </Link>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block hover:block">
                        <Link
                          to="/notice"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ fontSize: '15px' }}
                        >
                          공지사항
                        </Link>
                        <Link
                          to="/faq"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ fontSize: '15px' }}
                        >
                          자주묻는질문
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 로고와 검색창 */}
              <div className="flex flex-col md:flex-row items-center justify-between py-2">
                <div className="w-full md:w-1/4 mb-4 md:mb-0 flex justify-center md:justify-start md:pl-55">
                  <Link to="/" className="flex items-center group">
                    <div>
                      <img src={LOGO} alt="logo" style={{ width: '150px' }} />
                      {/* <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                        Favicon
                      </span> */}
                      <div className="text-xs text-gray-500 mt-0.5">
                        Flow & Vision Connection
                      </div>
                    </div>
                  </Link>
                </div>
                {/* 우측 AI Chat 버튼 */}
                <div className="w-full md:w-1/4 flex justify-center md:justify-end space-x-3">
                  <Link to="/ai">
                    <Button
                      className="px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      title="AI 챗봇으로 데이터 검색"
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      <span>AI Chat</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 메인 네비게이션 */}
          <div className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <nav className="flex flex-wrap items-center">
                {/* 북마크 메뉴 */}
                <div className="w-full md:w-1/5 flex justify-center md:justify-start relative group md:ml-4">
                  <Link
                    to="/bookmarks"
                    className="ml-45 flex items-center py-4 px-5 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                  >
                    <Bookmark className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>북마크</span>
                  </Link>
                  <div className="absolute left-45 top-full mt-1 w-64 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block hover:block">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h4 className="font-medium text-sm text-gray-800">
                        북마크 리스트
                      </h4>
                    </div>
                    {/* 기후 데이터 북마크 */}
                    <div className="relative group/climate">
                      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                          기후 데이터 북마크
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/climate:block hover:block ml-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h4 className="font-medium text-sm text-blue-600">
                            기후 데이터 북마크
                          </h4>
                        </div>
                        {bookmarkData.climate.map((item) => (
                          <Link
                            key={item.id}
                            to={`/datasets/${item.id}`}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span className="truncate">{item.title}</span>
                            <span className="text-xs text-gray-500">
                              {item.date}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <Link
                            to="/bookmarks/climate"
                            className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-100"
                          >
                            모든 기후 북마크 보기
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* 환경 데이터 북마크 */}
                    <div className="relative group/environment">
                      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          환경 데이터 북마크
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/environment:block hover:block ml-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h4 className="font-medium text-sm text-green-600">
                            환경 데이터 북마크
                          </h4>
                        </div>
                        {bookmarkData.environment.map((item) => (
                          <Link
                            key={item.id}
                            to={`/datasets/${item.id}`}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span className="truncate">{item.title}</span>
                            <span className="text-xs text-gray-500">
                              {item.date}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <Link
                            to="/bookmarks/environment"
                            className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
                          >
                            모든 환경 북마크 보기
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* 질병 데이터 북마크 */}
                    <div className="relative group/disease">
                      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                          질병 데이터 북마크
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/disease:block hover:block ml-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h4 className="font-medium text-sm text-red-600">
                            질병 데이터 북마크
                          </h4>
                        </div>
                        {bookmarkData.disease.map((item) => (
                          <Link
                            key={item.id}
                            to={`/datasets/${item.id}`}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span className="truncate">{item.title}</span>
                            <span className="text-xs text-gray-500">
                              {item.date}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <Link
                            to="/bookmarks/disease"
                            className="block px-4 py-2 text-sm text-red-600 font-medium hover:bg-gray-100"
                          >
                            모든 질병 북마크 보기
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* 모든 북마크 보기 */}
                    <div className="relative group/all border-t border-gray-100 mt-1 pt-1">
                      <div className="flex items-center justify-between px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100 cursor-pointer">
                        <span>모든 북마크 보기</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/all:block hover:block ml-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h4 className="font-medium text-sm text-green-800">
                            모든 북마크
                          </h4>
                        </div>
                        {[
                          ...bookmarkData.climate,
                          ...bookmarkData.environment,
                          ...bookmarkData.disease,
                        ].map((item) => (
                          <Link
                            key={item.id}
                            to={`/datasets/${item.id}`}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span className="truncate">{item.title}</span>
                            <span className="text-xs text-gray-500">
                              {item.date}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <Link
                            to="/bookmarks/all"
                            className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
                          >
                            북마크 관리하기
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 나머지 메뉴들 */}
                <div className="w-full md:w-3/5 px-4 flex justify-center gap-x-15">
                  <Link
                    to="/list"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                  >
                    <Database className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>데이터 목록</span>
                  </Link>
                  <Link
                    to="/anls"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                  >
                    <BarChart2 className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>데이터 분석</span>
                  </Link>
                  <Link
                    to="/bulletin"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                  >
                    <FileQuestion className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>데이터 요청</span>
                  </Link>
                  <Link
                    to="/manual"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>이용안내</span>
                  </Link>
                </div>
                <div className="w-full md:w-1/5 hidden md:block"></div>
              </nav>
            </div>
          </div>
        </header>
        {/* Outlet에 로그인 상태 context 전달 */}
        <Suspense>
          <Outlet
            context={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}
          />
        </Suspense>
        {outModal && (
          <Logout_modal
            onClose={handleCloseModal}
            className={outModal ? 'active' : ''}
          />
        )}

        <footer className="mt-auto bg-gray-100 border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Favicon</h3>
                <p className="text-gray-600">
                  기후, 환경, 질병 관련 데이터를 한눈에 제공하는 데이터
                  포털입니다.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">카테고리</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/list?category=기후"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      기후
                    </a>
                  </li>
                  <li>
                    <a
                      href="/list?category=환경"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      환경
                    </a>
                  </li>
                  <li>
                    <a
                      href="/list?category=질병"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      질병
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">정보</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/about"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      소개
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      이용약관
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      개인정보처리방침
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">문의</h3>
                <p className="text-gray-600">
                  이메일: contact@favicon.com
                  <br />
                  전화: 02-123-4567
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
              © 2025 Favicon. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
