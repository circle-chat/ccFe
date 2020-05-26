import React from 'react';
import './App.css';
import JoinForm from '../JoinForm/JoinForm.js';
import RoomForm from '../RoomForm/RoomForm.js';
import { Route } from 'react-router-dom';
import {ReactComponent as ChatLogo} from './assets/message.svg'

function App() {
  return (
    <main className="App">
      <header>
        <div className='logo-box'>
          <ChatLogo />
          <div className='dash-circle'></div>
        </div>
        <h1>Circle Chat</h1>
      </header>
      <Route path='/' exact>
        <JoinForm />
      </Route>
      <Route path='/create' exact>
        <RoomForm />
      </Route>
    </main>
  );
}

export default App;
