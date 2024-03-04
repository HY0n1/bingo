import React, { useEffect, useState } from 'react';
import './Rank.scss';
import { mavenList, primeList } from 'constants/bingo';
import axios from 'axios';

import { apiUrl } from 'services/api';


type Item = {
  rank: number,
  bojid: string,
  name: string,
  tier: string,
  sector: string,
  phase: number,
  bingo: number,
  solved: number,
  problem: number[]
}

const RankItem = ({ rank, data, matching, onChangeData }: any) => {
  const [detail, setDetail] = useState(false);

  const changeView = () => {
    if (!detail && data.problem === undefined) {
      axios.get(`${ apiUrl }/user/solved?id=${ data.bojid }`)
        .then((res) => {
          if (res.data.pid == null) data.problem = [];
          else data.problem = res.data.pid.split(',').map(Number);
          onChangeData(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    setDetail(!detail);
  }

  if (matching === '' || data.bojid.substring(0,matching.length) === matching || data.name.substring(0,matching.length) === matching) {
    return (
      <div className={ 'rank-item' + (data.phase === 2 ? ' all-bingo' : '') }>
        <div className='item-header'>
          <div className='user-profile'>
            <div className={ `user-rank` + (rank < 4 ? ` rank-ani-${ rank }` : '') }>{ rank }</div>
            <img className='user-tier' src={ `https://d2gd6pc034wcta.cloudfront.net/tier/${ data.tier }.svg` } alt='tier'/>
            <div className='user-name'>{ data.bojid } ({ data.name })</div>
          </div>
          <div className='item-recap'>
            <div className={ `sector ${ data.sector.toLowerCase() }` }>{ data.sector }</div>
            { data.phase < 2 ?
              <>
                <div>{ data.phase + 1 } 단계</div>
                <div>{ data.bingo } 빙고</div>
                <div>{ data.solved } 해결</div>
              </>
              :
              <>
                <div className='all-bingo-comment'>&#127881;ALL BINGO&#127881;</div>
              </>
            }
            {/* <div>{ data.phase + 1 } 단계</div>
            <div>{ data.bingo } 빙고</div>
            <div>{ data.solved } 해결</div> */}
          </div>
          <img className='item-detail' src='/assets/drop-down-button.svg' alt='more' onClick={ changeView } />
        </div>
        { detail &&
          <div className='bingo-view'>
            <div className='bingo-table'>
              { data.sector === "MAVEN" ?
                mavenList.map((pid, idx) => {
                  return (
                    <div className='bingo-block' key={ idx }>
                      <a href={'https://www.acmicpc.net/problem/' + pid } target='_blank' rel='noopener noreferrer'>
                        <div className={ (data.problem && data.problem.includes(pid) ? 'clear ' : '') +
                                        (idx % 5 === 0 || idx % 5 === 4 || idx / 5 < 1 || idx / 5 >= 4 ? 'gold' : 'silver') }>
                          { pid }
                        </div>
                      </a>
                    </div>
                  );
                })
                :
                primeList.map((pid, idx) => {
                  return (
                    <div className='bingo-block' key={ idx }>
                      <a href={'https://www.acmicpc.net/problem/' + pid } target='_blank' rel='noopener noreferrer'>
                        <div className={ (data.problem && data.problem.includes(pid) ? 'clear ' : '') +
                                        (idx % 5 === 0 || idx % 5 === 4 || idx / 5 < 1 || idx / 5 >= 4 ? 'silver' : 'bronze') }>
                          { pid }
                        </div>
                      </a>
                    </div>
                  );
                })
              }
            </div>
          </div>
        }
      </div>
    );
  } else {
    return (<></>);
  }
}

const Rank = () => {
  const [searchID, setSearchID] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchID(e.target.value);

  const [updated, setUpdated] = useState<string>('');

  const [filter, setFilter] = useState<number>(0);
  const changeFilter = (type: number) => setFilter(type);

  const [itemList, setItemList] = useState<Item[]>([]);

  const onChangeProblemList = (data: Item) => {
    const findIdx = itemList.findIndex(element => element.rank === data.rank);
    if (findIdx !== -1) {
      let copyList = [...itemList];
      copyList[findIdx] = {...data};
      setItemList(copyList);
    }
  };

  useEffect(() => {
    axios.get(`${ apiUrl }/user/rank`)
      .then((res) => {
        if (res.data !== 'failed')
          setItemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    axios.get(`${ apiUrl }/user/updated`)
      .then((res) => {
        setUpdated(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <>
    <div className='rank-updated'>{ updated ? `최근 갱신: ${ updated }` : '' }</div>
    <div className='rank-option'>
      <div className='search-user'>
        <input onChange={ onChange } value={ searchID } />
        <img src='/assets/search.svg' className='search-icon' alt='search' />
      </div>
      <ul className='rank-filter'>
        <div>보기</div>
        <li onClick={ () => changeFilter(0) }>ALL</li>
        <li className='maven' onClick={ () => changeFilter(1) }>MAVEN</li>
        <li className='prime' onClick={ () => changeFilter(2) }>PRIME</li>
      </ul>
    </div>
    <div className='rank-list'>
      {
        itemList.filter((obj) => filter === 0 || (filter === 1 && obj.sector === "MAVEN") || (filter === 2 && obj.sector === "PRIME")).map((item, idx) => {
          return (<RankItem key={ item.rank } rank={ idx + 1 } data={ item } matching={ searchID } onChangeData={ onChangeProblemList }/>);
        })
      }
    </div>
    </>
  );
}

export default Rank;
