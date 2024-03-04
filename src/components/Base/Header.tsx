import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='wrap-header'>
        <h1><Link to={'/'}>ZERONE</Link></h1>
        <nav>
          <ul>
            <li>
              <Link to={'/event'}>이벤트</Link>
            </li>
            <li>
              <Link to={'/rank'}>순위</Link>
            </li>
            <li>
              <Link to={'/register'}>등록</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
