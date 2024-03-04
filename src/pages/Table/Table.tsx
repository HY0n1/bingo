import React, { useEffect, useState } from 'react';
import './Table.scss';
import { mavenList, primeList } from 'constants/bingo';

type UserData = {
  id: string,
  type: string,
  problem: Object | any
}

const Table = () => {
  const [searchID, setSearchID] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchID(e.target.value);

  const [data, setData] = useState<UserData>({
    id: '',
    type: '',
    problem: {}
  });

  return (
    <>
    {/* <div className='search-wrap'>
      <input onChange={ onChange } value={ searchID } placeholder='아이디 검색' />
    </div> */}
    <div className='bingo-overall'>
      <div className='bingo-wrap'>
        <div className='bingo-title'>MAVEN</div>
        <div className='bingo-table'>
          {
            mavenList.map((pid, idx) => {
              return (
                <div key={ idx } className='bingo-block'>
                  <a href={'https://www.acmicpc.net/problem/' + pid } target='_blank' rel='noopener noreferrer'>
                    <div className={ (data.problem[pid.toString()] === 1 ? 'clear ' : '') +
                                  (idx % 5 === 0 || idx % 5 === 4 || idx / 5 < 1 || idx / 5 >= 4 ? 'gold' : 'silver') +
                                  (data.type === 'PRIME' ? '-disabled' : '') }><p>{ pid }</p></div>
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className='bingo-wrap'>
        <div className='bingo-title'>PRIME</div>
        <div className='bingo-table'>
          { 
            primeList.map((pid, idx) => {
              return (
                <div key={ idx } className='bingo-block'>
                  <a href={'https://www.acmicpc.net/problem/' + pid } target='_blank' rel='noopener noreferrer'>
                    <div className={ (data.problem[pid.toString()] === 1 ? 'clear ' : '') +
                                    (idx % 5 === 0 || idx % 5 === 4 || idx / 5 < 1 || idx / 5 >= 4 ? 'silver' : 'bronze') +
                                    (data.type === 'MAVEN' ? '-disabled' : '') }><p>{ pid }</p></div>
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
    </>
  );
}

export default Table;
