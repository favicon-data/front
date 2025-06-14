// import React, { useState, useEffect, Suspense } from 'react';
// import '../styles/index.css';
// import { ThemeProvider } from '../components/theme-provider.tsx';
// import { Button } from '../components/ui/button.tsx';
// import { useLocation } from 'react-router-dom';
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
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import Logout_modal from '../components/Logout_modal.jsx';
// import type { OutletContextType } from '../types/OutletContextType.ts';

// export default function RootLayout() {
//   // 로그인 상태 및 사용자명 관리
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [outModal, setoutModal] = useState(false);
//   const [bookmarkList, setBookmarkList] = useState([]);
//   const [bookmarkLoading, setBookmarkLoading] = useState(false);
//   const [bookmarkError, setBookmarkError] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();

//   // 북마크 리스트 fetch 함수 분리
//   const fetchBookmarkList = () => {
//     setBookmarkLoading(true);
//     setBookmarkError('');
//     fetch('http://54.180.238.119:8080/users/scrap', {
//       credentials: 'include',
//       // headers: { Authorization: `Bearer ${token}` }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error('서버 오류');
//         return res.json();
//       })
//       .then((data) => {
//         setBookmarkList(Array.isArray(data) ? data : data.data || []);
//       })
//       .catch(() => setBookmarkError('북마크를 불러오지 못했습니다.'))
//       .finally(() => setBookmarkLoading(false));
//   };

//   // isLoggedIn이 true가 될 때만 북마크 fetch
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchBookmarkList();
//     } else {
//       setBookmarkList([]);
//       setBookmarkError('');
//       setBookmarkLoading(false);
//     }
//   }, [isLoggedIn]);

//   // 로그아웃 핸들러
//   const handleLogout = () => {
//     setUserName('');
//     setIsLoggedIn(false);
//     setoutModal(true);
//     navigate('/');
//   };

//   // 모달창 닫기
//   const handleCloseModal = () => {
//     setoutModal(false);
//   };

//   // 카테고리별 분류 (category 필드가 'climate', 'environment', 'disease'라고 가정)
//   const climateBookmarks = bookmarkList.filter((b) => b.theme === '기후');
//   const environmentBookmarks = bookmarkList.filter((b) => b.theme === '환경');
//   const diseaseBookmarks = bookmarkList.filter((b) => b.theme === '질병');
//   const allBookmarks = bookmarkList;

//   return (
//     <ThemeProvider>
//       <div className="flex min-h-screen flex-col">
//         <header>
//           <div className="border-b bg-white">
//             <div className="container mx-auto px-4 py-3">
//               {/* 상단 메뉴 */}
//               <div className="flex justify-end mb-4 text-sm">
//                 {!isLoggedIn ? (
//                   <>
//                     <Link
//                       to="/signup"
//                       className="text-gray-600 hover:text-gray-900 mr-4"
//                       style={{ fontSize: '15px' }}
//                     >
//                       회원가입
//                     </Link>
//                     <Link
//                       to="/login"
//                       className="text-gray-600 hover:text-gray-900 mr-4"
//                       style={{ fontSize: '15px' }}
//                     >
//                       로그인
//                     </Link>
//                     {/* 고객센터 드롭다운 메뉴 */}
//                     <div className="relative group">
//                       <span
//                         className="text-gray-600 hover:text-gray-900 flex items-center group-hover:block hover:block"
//                         style={{ fontSize: '15px' }}
//                       >
//                         고객센터 ▾
//                       </span>
//                       <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block hover:block">
//                         <Link
//                           to="/notice"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           style={{ fontSize: '15px' }}
//                         >
//                           공지사항
//                         </Link>
//                         <Link
//                           to="/faq"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           style={{ fontSize: '15px' }}
//                         >
//                           자주묻는질문
//                         </Link>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <span
//                       className="text-black font-semibold mr-4"
//                       style={{ fontSize: '15px' }}
//                     >
//                       {userName} 님
//                     </span>
//                     <button
//                       onClick={handleLogout}
//                       className="text-gray-600 hover:text-gray-900 mr-4"
//                       style={{ fontSize: '15px' }}
//                     >
//                       로그아웃
//                     </button>
//                     <div className="relative group">
//                       <span
//                         className="text-gray-600 hover:text-gray-900 flex items-center group-hover:block hover:block"
//                         style={{ fontSize: '15px', marginBottom: '0' }}
//                       >
//                         고객센터 ▾
//                       </span>
//                       <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block hover:block">
//                         <Link
//                           to="/notice"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           style={{ fontSize: '15px' }}
//                         >
//                           공지사항
//                         </Link>
//                         <Link
//                           to="/faq"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           style={{ fontSize: '15px' }}
//                         >
//                           자주묻는질문
//                         </Link>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//               {/* 로고와 검색창 - 검색창 중앙 배치 */}
//               <div className="flex flex-col md:flex-row items-center justify-between py-2">
//                 <div className="w-full md:w-1/4 mb-4 md:mb-0 flex justify-center md:justify-start md:pl-55">
//                   <Link to="/" className="flex items-center group">
//                     <div>
//                       <span
//                         className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
//                         style={{ fontSize: '2.0rem' }}
//                       >
//                         Favicon
//                       </span>
//                       <div className="text-xs text-gray-500 mt-0.5">
//                         Flow & Vision Connection
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//                 {/* 검색창 */}
//                 {location.pathname !== '/list' && (
//                   <div className="w-full md:w-1/3 px-4">
//                     <div className="flex shadow-md rounded-lg overflow-hidden">
//                       <div className="relative flex-grow">
//                         <Input
//                           type="search"
//                           className="h-[48px] py-2.5 text-base rounded-l-lg rounded-r-none border-r-0 border-gray-300 focus:ring-green-500 focus:border-green-500"
//                           placeholder="검색어를 입력해주세요."
//                           style={{ fontSize: '1.1rem' }}
//                         />
//                       </div>
//                       <Button className="h-[48px] px-4 rounded-l-none bg-green-500 hover:bg-green-600 transition-colors text-white">
//                         <Search className="h-5 w-5" />
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//                 {/* 우측 AI Chat 버튼 */}
//                 <div className="w-full md:w-1/4 flex justify-center md:justify-end space-x-3">
//                   <Link to="/ai">
//                     <Button
//                       className="px-3 bg-green-500  hover:bg-green-600 text-white rounded-lg"
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
//           {/* 메인 네비게이션 */}
//           <div className="bg-white shadow-sm">
//             <div className="container mx-auto px-4">
//               <nav className="flex flex-wrap items-center">
//                 {/* 북마크 메뉴 */}
//                 <div className="w-full md:w-1/5 flex justify-center md:justify-start relative group md:ml-4">
//                   <Link
//                     to="/bookmarks"
//                     className="ml-45 flex items-center py-4 px-5 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                   >
//                     <Bookmark className="h-5 w-5 mr-2" />
//                     <span style={{ fontSize: '20px' }}>북마크</span>
//                   </Link>
//                   {/* 북마크 드롭다운 */}
//                   {isLoggedIn && (
//                     <div className="absolute left-45 top-full mt-0 w-64 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block hover:block">
//                       <div className="px-4 py-2 border-b border-gray-100">
//                         <h4 className="font-medium text-sm text-gray-800">
//                           북마크 리스트
//                         </h4>
//                       </div>
//                       {bookmarkLoading && (
//                         <div className="px-4 py-2 text-sm text-gray-400">
//                           불러오는 중...
//                         </div>
//                       )}
//                       {bookmarkError && (
//                         <div className="px-4 py-2 text-sm text-red-500">
//                           {bookmarkError}
//                         </div>
//                       )}
//                       {!bookmarkLoading && !bookmarkError && (
//                         <>
//                           {/* 기후 데이터 북마크 */}
//                           <div className="relative group/climate">
//                             <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                               <div className="flex items-center">
//                                 <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                                 기후 데이터 북마크
//                               </div>
//                               <ChevronRight className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/climate:block hover:block ml-0.5">
//                               <div className="px-4 py-2 border-b border-gray-100">
//                                 <h4 className="font-medium text-sm text-blue-600">
//                                   기후 데이터 북마크
//                                 </h4>
//                               </div>
//                               {climateBookmarks.length === 0 && (
//                                 <div className="px-4 py-2 text-sm text-gray-400">
//                                   없음
//                                 </div>
//                               )}
//                               {climateBookmarks.map((item) => (
//                                 <Link
//                                   key={item.datasetId}
//                                   to={`/detail/${item.datasetId}`}
//                                   className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 >
//                                   <span className="truncate">{item.title}</span>
//                                   <span className="text-xs text-gray-500">
//                                     {item.date}
//                                   </span>
//                                 </Link>
//                               ))}
//                               <div className="border-t border-gray-100 mt-1 pt-1">
//                                 <Link
//                                   to="/bookmarks/climate"
//                                   className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-100"
//                                 >
//                                   모든 기후 북마크 보기
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           {/* 환경 데이터 북마크 */}
//                           <div className="relative group/environment">
//                             <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                               <div className="flex items-center">
//                                 <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
//                                 환경 데이터 북마크
//                               </div>
//                               <ChevronRight className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/environment:block hover:block ml-0.5">
//                               <div className="px-4 py-2 border-b border-gray-100">
//                                 <h4 className="font-medium text-sm text-green-600">
//                                   환경 데이터 북마크
//                                 </h4>
//                               </div>
//                               {environmentBookmarks.length === 0 && (
//                                 <div className="px-4 py-2 text-sm text-gray-400">
//                                   없음
//                                 </div>
//                               )}
//                               {environmentBookmarks.map((item) => (
//                                 <Link
//                                   key={item.datasetId}
//                                   to={`/detail/${item.datasetId}`}
//                                   className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 >
//                                   <span className="truncate">{item.title}</span>
//                                   <span className="text-xs text-gray-500">
//                                     {item.date}
//                                   </span>
//                                 </Link>
//                               ))}
//                               <div className="border-t border-gray-100 mt-1 pt-1">
//                                 <Link
//                                   to="/bookmarks/environment"
//                                   className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
//                                 >
//                                   모든 환경 북마크 보기
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           {/* 질병 데이터 북마크 */}
//                           <div className="relative group/disease">
//                             <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                               <div className="flex items-center">
//                                 <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
//                                 질병 데이터 북마크
//                               </div>
//                               <ChevronRight className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/disease:block hover:block ml-0.5">
//                               <div className="px-4 py-2 border-b border-gray-100">
//                                 <h4 className="font-medium text-sm text-red-600">
//                                   질병 데이터 북마크
//                                 </h4>
//                               </div>
//                               {diseaseBookmarks.length === 0 && (
//                                 <div className="px-4 py-2 text-sm text-gray-400">
//                                   없음
//                                 </div>
//                               )}
//                               {diseaseBookmarks.map((item) => (
//                                 <Link
//                                   key={item.datasetId}
//                                   to={`/detail/${item.datasetId}`}
//                                   className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 >
//                                   <span className="truncate">{item.title}</span>
//                                   <span className="text-xs text-gray-500">
//                                     {item.date}
//                                   </span>
//                                 </Link>
//                               ))}
//                               <div className="border-t border-gray-100 mt-1 pt-1">
//                                 <Link
//                                   to="/bookmarks/disease"
//                                   className="block px-4 py-2 text-sm text-red-600 font-medium hover:bg-gray-100"
//                                 >
//                                   모든 질병 북마크 보기
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           {/* 모든 북마크 보기 */}
//                           <div className="relative group/all border-t border-gray-100 mt-1 pt-1">
//                             <div className="flex items-center justify-between px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100 cursor-pointer">
//                               <span>모든 북마크 보기</span>
//                               <ChevronRight className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/all:block hover:block ml-1">
//                               <div className="px-4 py-2 border-b border-gray-100">
//                                 <h4 className="font-medium text-sm text-green-800">
//                                   모든 북마크
//                                 </h4>
//                               </div>
//                               {allBookmarks.length === 0 && (
//                                 <div className="px-4 py-2 text-sm text-gray-400">
//                                   없음
//                                 </div>
//                               )}
//                               {allBookmarks.map((item) => (
//                                 <Link
//                                   key={item.datasetId}
//                                   to={`/detail/${item.datasetId}`}
//                                   className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 >
//                                   <span className="truncate">{item.title}</span>
//                                   <span className="text-xs text-gray-500">
//                                     {item.date}
//                                   </span>
//                                 </Link>
//                               ))}
//                               <div className="border-t border-gray-100 mt-1 pt-1">
//                                 <Link
//                                   to="/bookmarks/all"
//                                   className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
//                                 >
//                                   북마크 관리하기
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {/* 나머지 메뉴들 */}
//                 <div className="w-full md:w-3/5 px-4 flex justify-center gap-x-15">
//                   <Link
//                     to="/list"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                     style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
//                   >
//                     <Database className="h-5 w-5 mr-2" />
//                     <span style={{ fontSize: '20px' }}>데이터 목록</span>
//                   </Link>
//                   <Link
//                     to="/anls"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                     style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
//                   >
//                     <BarChart2 className="h-5 w-5 mr-2" />
//                     <span style={{ fontSize: '20px' }}>데이터 분석</span>
//                   </Link>
//                   <Link
//                     to="/bulletin"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                     style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
//                   >
//                     <FileQuestion className="h-5 w-5 mr-2" />
//                     <span style={{ fontSize: '20px' }}>데이터 요청</span>
//                   </Link>
//                   <Link
//                     to="/manual"
//                     className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
//                     style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
//                   >
//                     <BookOpen className="h-5 w-5 mr-2" />
//                     <span style={{ fontSize: '20px' }}>이용안내</span>
//                   </Link>
//                 </div>
//                 <div className="w-full md:w-1/5 hidden md:block"></div>
//               </nav>
//             </div>
//           </div>
//         </header>

//         <Suspense>
//           <Outlet
//             context={{
//               fetchBookmarkList,
//               isLoggedIn,
//               setIsLoggedIn,
//               userName,
//               setUserName,
//             }}
//           />
//         </Suspense>
//         {outModal && (
//           <Logout_modal
//             onClose={handleCloseModal}
//             className={outModal ? 'active' : ''}
//           />
//         )}

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
//   );
// }
import React, { useState, useEffect, Suspense } from 'react';
import '../styles/index.css';
import { ThemeProvider } from '../components/theme-provider.tsx';
import { Button } from '../components/ui/button.tsx';
import { useLocation } from 'react-router-dom';
import { Input } from '../components/ui/input.tsx';
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
import type { OutletContextType } from '../types/OutletContextType.ts';
import Modal from '../components/BookmarkModal.jsx';

export default function RootLayout() {
  // 로그인 상태 및 사용자명 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [outModal, setoutModal] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [bookmarkError, setBookmarkError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // /list?search=검색어 로 이동
      navigate(`/list?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  //북마크 모달창(삭제 관련)
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // 북마크 삭제 함수
  const handleDeleteBookmark = async (scrapId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setDeleteLoading(scrapId);
    setDeleteError('');
    try {
      const res = await fetch(
        `http://54.180.238.119:8080/users/scrap/${scrapId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      if (!res.ok) throw new Error('삭제 실패');
      await fetchBookmarkList();
    } catch (err) {
      setDeleteError('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // 북마크 리스트 fetch 함수 분리
  const fetchBookmarkList = () => {
    setBookmarkLoading(true);
    setBookmarkError('');
    fetch('http://54.180.238.119:8080/users/scrap', {
      credentials: 'include',
      // headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('서버 오류');
        return res.json();
      })
      .then((data) => {
        setBookmarkList(Array.isArray(data) ? data : data.data || []);
      })
      .catch(() => setBookmarkError('북마크를 불러오지 못했습니다.'))
      .finally(() => setBookmarkLoading(false));
  };

  // isLoggedIn이 true가 될 때만 북마크 fetch
  useEffect(() => {
    if (isLoggedIn) {
      fetchBookmarkList();
    } else {
      setBookmarkList([]);
      setBookmarkError('');
      setBookmarkLoading(false);
    }
  }, [isLoggedIn]);

  // 로그아웃 핸들러
  const handleLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
    setoutModal(true);
    navigate('/');
  };

  // 모달창 닫기
  const handleCloseModal = () => {
    setoutModal(false);
  };

  // 카테고리별 분류 (category 필드가 'climate', 'environment', 'disease'라고 가정)
  const climateBookmarks = bookmarkList.filter((b) => b.theme === '기후');
  const environmentBookmarks = bookmarkList.filter((b) => b.theme === '환경');
  const diseaseBookmarks = bookmarkList.filter((b) => b.theme === '질병');
  const allBookmarks = bookmarkList;

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
                      <span
                        className="text-gray-600 hover:text-gray-900 flex items-center group-hover:block hover:block"
                        style={{ fontSize: '15px' }}
                      >
                        고객센터 ▾
                      </span>
                      <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block hover:block">
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
                      className="text-black font-semibold mr-4"
                      style={{ fontSize: '15px' }}
                    >
                      {userName} 님
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-900 mr-4"
                      style={{ fontSize: '15px' }}
                    >
                      로그아웃
                    </button>
                    <div className="relative group">
                      <span
                        className="text-gray-600 hover:text-gray-900 flex items-center group-hover:block hover:block"
                        style={{ fontSize: '15px', marginBottom: '0' }}
                      >
                        고객센터 ▾
                      </span>
                      <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block hover:block">
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
              {/* 로고와 검색창 - 검색창 중앙 배치 */}
              <div className="flex flex-col md:flex-row items-center justify-between py-2">
                <div className="w-full md:w-1/4 mb-4 md:mb-0 flex justify-center md:justify-start md:pl-55">
                  <Link to="/" className="flex items-center group">
                    <div>
                      <span
                        className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
                        style={{ fontSize: '2.0rem' }}
                      >
                        Favicon
                      </span>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Flow & Vision Connection
                      </div>
                    </div>
                  </Link>
                </div>
                {/* 검색창 */}
                {location.pathname !== '/list' && (
                  <div className="w-full md:w-1/3 px-4">
                    <div className="flex shadow-md rounded-lg overflow-hidden">
                      <div className="relative flex-grow">
                        <Input
                          type="search"
                          className="h-[48px] py-2.5 text-base rounded-l-lg rounded-r-none border-r-0 border-gray-300 focus:ring-green-500 focus:border-green-500"
                          placeholder="검색어를 입력해주세요."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch();
                          }}
                          style={{ fontSize: '1.1rem' }}
                        />
                      </div>
                      <Button
                        onClick={handleSearch}
                        className="h-[48px] px-4 rounded-l-none bg-green-500 hover:bg-green-600 transition-colors text-white"
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
                {/* 우측 AI Chat 버튼 */}
                <div className="w-full md:w-1/4 flex justify-center md:justify-end space-x-3">
                  <Link to="/ai">
                    <Button
                      className="px-3 bg-green-500  hover:bg-green-600 text-white rounded-lg"
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
                  <div className="ml-45 flex items-center py-4 px-5 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap">
                    <Bookmark className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>북마크</span>
                  </div>
                  {/* 북마크 드롭다운 */}
                  {isLoggedIn && (
                    <div className="absolute left-45 top-full mt-0 w-64 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block hover:block">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h4 className="font-medium text-sm text-gray-800">
                          북마크 리스트
                        </h4>
                      </div>
                      {bookmarkLoading && (
                        <div className="px-4 py-2 text-sm text-gray-400">
                          불러오는 중...
                        </div>
                      )}
                      {bookmarkError && (
                        <div className="px-4 py-2 text-sm text-red-500">
                          {bookmarkError}
                        </div>
                      )}
                      {!bookmarkLoading && !bookmarkError && (
                        <>
                          {/* 기후 데이터 북마크 */}
                          <div className="relative group/climate">
                            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                기후 데이터 북마크
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/climate:block hover:block ml-0.5">
                              <div className="px-4 py-2 border-b border-gray-100">
                                <h4 className="font-medium text-sm text-blue-600">
                                  기후 데이터 북마크
                                </h4>
                              </div>
                              {climateBookmarks.length === 0 && (
                                <div className="px-4 py-2 text-sm text-gray-400">
                                  없음
                                </div>
                              )}
                              {climateBookmarks.map((item) => (
                                <Link
                                  key={item.datasetId}
                                  to={`/detail/${item.datasetId}`}
                                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <span className="truncate">{item.title}</span>
                                  <span className="text-xs text-gray-500">
                                    {item.date}
                                  </span>
                                </Link>
                              ))}
                              <div className="border-t border-gray-100 mt-1 pt-1">
                                {/* <Link
                                  to="/bookmarks/climate"
                                  className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-100"
                                >
                                  모든 기후 북마크 보기
                                </Link> */}
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
                            <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/environment:block hover:block ml-0.5">
                              <div className="px-4 py-2 border-b border-gray-100">
                                <h4 className="font-medium text-sm text-green-600">
                                  환경 데이터 북마크
                                </h4>
                              </div>
                              {environmentBookmarks.length === 0 && (
                                <div className="px-4 py-2 text-sm text-gray-400">
                                  없음
                                </div>
                              )}
                              {environmentBookmarks.map((item) => (
                                <Link
                                  key={item.datasetId}
                                  to={`/detail/${item.datasetId}`}
                                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <span className="truncate">{item.title}</span>
                                  <span className="text-xs text-gray-500">
                                    {item.date}
                                  </span>
                                </Link>
                              ))}
                              <div className="border-t border-gray-100 mt-1 pt-1">
                                {/* <Link
                                  to="/bookmarks/environment"
                                  className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
                                >
                                  모든 환경 북마크 보기
                                </Link> */}
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
                            <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/disease:block hover:block ml-0.5">
                              <div className="px-4 py-2 border-b border-gray-100">
                                <h4 className="font-medium text-sm text-red-600">
                                  질병 데이터 북마크
                                </h4>
                              </div>
                              {diseaseBookmarks.length === 0 && (
                                <div className="px-4 py-2 text-sm text-gray-400">
                                  없음
                                </div>
                              )}
                              {diseaseBookmarks.map((item) => (
                                <Link
                                  key={item.datasetId}
                                  to={`/detail/${item.datasetId}`}
                                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <span className="truncate">{item.title}</span>
                                  <span className="text-xs text-gray-500">
                                    {item.date}
                                  </span>
                                </Link>
                              ))}
                              <div className="border-t border-gray-100 mt-1 pt-1">
                                {/* <Link
                                  to="/bookmarks/disease"
                                  className="block px-4 py-2 text-sm text-red-600 font-medium hover:bg-gray-100"
                                >
                                  모든 질병 북마크 보기
                                </Link> */}
                              </div>
                            </div>
                          </div>
                          {/* 모든 북마크 보기 */}
                          <div className="relative group/all border-t border-gray-100 mt-1 pt-1">
                            <div
                              className="flex items-center justify-between px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100 cursor-pointer"
                              onClick={() => setBookmarkModalOpen(true)}
                            >
                              <span>모든 북마크 보기</span>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-lg py-1 z-30 hidden group-hover/all:block hover:block ml-1">
                              <div className="px-4 py-2 border-b border-gray-100">
                                <h4 className="font-medium text-sm text-green-800">
                                  모든 북마크
                                </h4>
                              </div>
                              {allBookmarks.length === 0 && (
                                <div className="px-4 py-2 text-sm text-gray-400">
                                  없음
                                </div>
                              )}
                              {allBookmarks.map((item) => (
                                <Link
                                  key={item.datasetId}
                                  to={`/detail/${item.datasetId}`}
                                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <span className="truncate">{item.title}</span>
                                  <span className="text-xs text-gray-500">
                                    {item.date}
                                  </span>
                                </Link>
                              ))}
                              <div className="border-t border-gray-100 mt-1 pt-1">
                                {/* <Link
                                  to="/bookmarks/all"
                                  className="block px-4 py-2 text-sm text-green-600 font-medium hover:bg-gray-100"
                                >
                                  북마크 관리하기
                                </Link> */}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {/* 나머지 메뉴들 */}
                <div className="w-full md:w-3/5 px-4 flex justify-center gap-x-15">
                  <Link
                    to="/list"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                    style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
                  >
                    <Database className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>데이터 목록</span>
                  </Link>
                  <Link
                    to="/anls"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                    style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
                  >
                    <BarChart2 className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>데이터 분석</span>
                  </Link>
                  <Link
                    to="/bulletin"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                    style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
                  >
                    <FileQuestion className="h-5 w-5 mr-2" />
                    <span style={{ fontSize: '20px' }}>데이터 요청</span>
                  </Link>
                  <Link
                    to="/manual"
                    className="flex items-center py-4 px-3 text-base text-gray-700 hover:text-green-600 hover:bg-green-50 border-b-2 border-transparent hover:border-green-600 transition-all whitespace-nowrap"
                    style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
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

        <Suspense>
          <Outlet
            context={{
              fetchBookmarkList,
              isLoggedIn,
              setIsLoggedIn,
              userName,
              setUserName,
            }}
          />
        </Suspense>
        {outModal && (
          <Logout_modal
            onClose={handleCloseModal}
            className={outModal ? 'active' : ''}
          />
        )}
        {/* 북마크 모달 */}
        <Modal
          open={bookmarkModalOpen}
          onClose={() => setBookmarkModalOpen(false)}
        >
          <h2 className="text-lg font-bold mb-4">모든 북마크</h2>
          {bookmarkLoading ? (
            <div className="text-gray-400 py-4">불러오는 중...</div>
          ) : bookmarkError ? (
            <div className="text-red-500 py-4">{bookmarkError}</div>
          ) : allBookmarks.length === 0 ? (
            <div className="text-gray-400 py-4">북마크가 없습니다.</div>
          ) : (
            <ul>
              {allBookmarks.map((item) => (
                <li
                  key={item.scrapId}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="ml-2 text-xs text-gray-400">
                      {item.date}
                    </span>
                  </div>
                  <button
                    className="ml-3 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-xs"
                    onClick={() => handleDeleteBookmark(item.scrapId)}
                    disabled={deleteLoading === item.scrapId}
                  >
                    {deleteLoading === item.scrapId ? '삭제중...' : '삭제'}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {deleteError && (
            <div className="text-red-500 mt-2">{deleteError}</div>
          )}
        </Modal>
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
