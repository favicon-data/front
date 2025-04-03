import React from 'react';
import '../Main.css';
import logo from '../components/images/favicon_logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <div className="header_wrap">
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: '145px' }} />
          </Link>
          <Link to="list">데이터 목록</Link>
          <Link to="anls">데이터 분석</Link>
          <Link to="bulletin">게시판</Link>
          <Link to="manual">이용안내</Link>
        </div>
      </header>
    </>
  );
}

export default Header;
