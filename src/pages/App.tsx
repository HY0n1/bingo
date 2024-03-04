import React from 'react';
import './App.scss';
import Header from 'components/Base/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main/Main';
import Event from './Event/Event';
import Rank from './Rank/Rank';
import Table from './Table/Table';
import Register, { GoogleOAuth2 } from './Register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <div id='content'>
        <Header />
        <div id='page'>
          <Routes>
            <Route path='/*' element={ <Navigate to='/event' /> } />
            <Route path='/event' Component={ Event } />
            <Route path='/rank' Component={ Rank } />
            <Route path='/oauth2' Component={ GoogleOAuth2 } />
            <Route path='/register' Component={ Register } />
            {/* <Route path='/admin' Component={ Table } /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
