import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Headers.jsx';
import Main from './pages/Main.jsx';
import Bulletin from './pages/Bulletin.jsx';
import DLIST from './pages/Data_list.jsx';
import Danls from './pages/Data_anls.jsx';
import Manual from './pages/Manual.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/LoginP.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<DLIST />} />
        <Route path="/anls" element={<Danls />} />
        <Route path="/bulletin" element={<Bulletin />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
