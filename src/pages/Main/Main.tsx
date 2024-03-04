import React from 'react';
import { Link } from 'react-router-dom';
import './Main.scss';

const Main = () => {
  return (
    <>
    <div className='main-wrap'>
    <Link to={'/event'}><div className='redirect-btn'>빙고 이벤트 바로가기</div></Link>
    </div>
    </>
  );
}

export default Main;
