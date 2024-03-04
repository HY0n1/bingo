import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './Register.scss';
import axios from 'axios';

import { apiUrl } from 'services/api';

const GoogleOAuth2 = () => {
  useEffect(() => {
    axios.get(`${ apiUrl }/user/oauth2/url`)
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => console.log(err));
  }, []);

  return (<></>);
} 

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();
  
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [bojID, setBojID] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9_]/ig, '')
    setBojID(e.target.value);
  }

  const onSignIn = () => {
    axios.get(`${ apiUrl }/user/oauth2/url`)
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => alert(err));
  }

  const onRegister = () => {
    if (!bojID) {
      alert('백준 아이디를 입력하세요.');
      return;
    }
    const code = searchParams.get("code");
    axios.post(`${ apiUrl }/user/register`, {
      code: code,
      bojid: bojID
    })
      .then((res) => {
        const { ok, message } = res.data;
        if (ok) {
          alert('등록 완료');
          nav('/');
        } else if (message === 'exist_email') {
          alert('등록된 이메일입니다.');
          setIsLogined(false);
          nav('/register');
        } else alert(message);
      })
      .catch((err) => alert(err));
  }

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setIsLogined(false);
      return;
    }
    const hd = searchParams.get("hd");
    if (hd !== 'hanyang.ac.kr') {
      alert('한양대 계정으로 로그인 하세요.')
      nav('/register');
      return;
    }
    setIsLogined(true);
  });

  return (
    <>
    { !isLogined ?
    <div className='step1'>
      <div className='step-title'>학회원 확인</div>
      <div className='description'>
        <p>한양대 계정으로 구글 로그인을 해주세요.</p>
        <p>아이디와 비밀번호는 한양인 포털과 동일합니다.</p>
      </div>
      <div className='login-example'>
        <p>* 구글 로그인 예시</p>
        <p>&#x2004;&#x2004;ID: 포털id@hanyang.ac.kr</p>
        <p>PW: 포털pw</p>
      </div>
      <div className='google-login' onClick={ onSignIn }>
        <img src='/assets/google.svg' alt="google" />
        <p>구글로 로그인</p>
      </div>
      <a className='policy' href='/policy.html' target='_blank' rel='noopener noreferrer'>개인정보처리방침</a>
    </div>
    :
    <div className='step2'>
      <div className='step-title'>백준 아이디 연동</div>
      <div className='description'>
        <p>본인 계정이 아니면 순위에서 제외됩니다.</p>
        <img src='https://d2gd6pc034wcta.cloudfront.net/logo/solvedac-black.svg' alt='solved' />
        <p><a href='https://solved.ac' target='_blank' rel='noopener noreferrer'>solved.ac</a>와 백준 아이디가 연동되어 있어야 합니다.</p>
        <p>* BOJ 홈페이지 &gt; 백준 설정 &gt; solved.ac &gt; 사용하기 [<a href='https://www.acmicpc.net/setting/solved.ac' target='_blank' rel='noopener noreferrer'>바로가기</a>]</p>
      </div>
      <input onChange={ onChange } value={ bojID } maxLength={ 40 } placeholder='백준 아이디' />
      <div className='register-btn' onClick={ onRegister }>등록하기</div>
    </div>
    }
    </>
  );
}

export default Register;
export { GoogleOAuth2 };
