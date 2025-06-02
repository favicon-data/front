// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// // import Header from './components/Headers.jsx';
// import Main from './pages/Main.jsx';
// import Bulletin from './pages/Bulletin.jsx';
// import DLIST from './pages/Data_list.jsx';
// import Danls from './pages/Data_anls.jsx';
// import Manual from './pages/Manual.jsx';
// import Signup from './pages/Signup.jsx';
// import Login from './pages/LoginP.jsx';
// import Ddetail from './pages/Data_detail.jsx';
// import Layout from './app/layout.tsx';
// import Home from './app/page.tsx';

// function App() {
//   return (
//     <BrowserRouter>
//       {/* <Header /> */}
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/ai" element={<Main />} />
//           <Route path="/list" element={<DLIST />} />
//           <Route path="/anls" element={<Danls />} />
//           <Route path="/bulletin" element={<Bulletin />} />
//           <Route path="/manual" element={<Manual />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/detail/:datasetId" element={<Ddetail />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './app/layout.tsx'; // RootLayout
import Home from './app/page.tsx';
import Main from './pages/Main.jsx';
import Bulletin from './pages/Bulletin.jsx';
import DLIST from './pages/Data_list.jsx';
import Danls from './pages/Data_anls.jsx';
import Manual from './pages/Manual.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/LoginP.jsx';
import Ddetail from './pages/Data_detail.jsx';
import NoticePage from './pages/NoticePage.jsx';
import FAQPage from './pages/FAQPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃 Route */}
        <Route path="/" element={<Layout />}>
          {/* 하위 페이지 Route들 */}
          <Route index element={<Home />} />
          <Route path="ai" element={<Main />} />
          <Route path="list" element={<DLIST />} />
          <Route path="anls" element={<Danls />} />
          <Route path="bulletin" element={<Bulletin />} />
          <Route path="manual" element={<Manual />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="detail/:datasetId" element={<Ddetail />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
