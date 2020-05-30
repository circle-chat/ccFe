import React, { useEffect } from 'react';
import './App.css';
import JoinForm from '../JoinForm/JoinForm.js';
import RoomForm from '../RoomForm/RoomForm.js';
import ChatContainer from '../ChatContainer/ChatContainer.js';
import { Route } from 'react-router-dom';
import {ReactComponent as ChatLogo} from './assets/message.svg';
import { grabLocalCodes } from './../../Actions/index.js';
import { connect } from 'react-redux';



function App({ grabLocalCodes }) {
  const landing = window.location.pathname === '/' ?
  'main-page' : 'not-main'

  const storeMyCodes = () => {
    const codes = JSON.parse(window.localStorage.getItem('codes'))
    if (codes) {
      grabLocalCodes( codes )
    }
  }

  useEffect(() => {
    storeMyCodes()
  }, [])

  return (
    <main className="App">
      <header className={landing}>
        <div className='logo-box'>
          <ChatLogo />
          <div className='dash-circle'></div>
        </div>
        <h1>The Circle</h1>
      </header>
      <Route path='/' exact>
        <JoinForm />
      </Route>
      <Route path='/create'>
        <RoomForm />
      </Route>
      <Route path='/chat' exact>
        <ChatContainer />
      </Route>
    </main>
  );
}

const mapDispatchToProps = dispatch => ({
  grabLocalCodes: code => dispatch(grabLocalCodes(code))
})

export default connect(null, mapDispatchToProps)(App);
