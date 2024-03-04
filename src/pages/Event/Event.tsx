import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Event.scss';
import Table from 'pages/Table/Table';

const Event = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(255, 205, 74)";

    return() => {
      document.body.style.backgroundColor = "#FFF";
    }
  }, []);

  return (
    <>
    <div className='event-header'>
      <div className='event-season'>23-24 윈터 시즌</div>
      <div className='event-name'>
        <div className='blue'>영과일</div>
        <div className='flex'>
          <div className='blue'>백준</div>
          <div className='bingo-font'>BINGO</div>
        </div>
      </div>
    </div>
    <Table />
    <div className='event-notice-wrap'>
      <div className='event-notice'>
        <div>#등록 시점 티어 기준</div>
        <div>&#x2004;&#x2004;플래티넘5 이상 MAVEN 미만 PRIME</div>
        <div>#2월 23일 까지</div>
        <div>#QA (<a href='/notice.html' target='_blank' rel='noopener noreferrer'>Link</a>)</div>
      </div>
      <Link to='/register'><div className='event-register'>참여하기</div></Link>
    </div>
    </>
  );
}

export default Event;
