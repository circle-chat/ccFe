import React from 'react';
import './App.css';
import JoinForm from '../JoinForm/JoinForm.js';
import RoomForm from '../RoomForm/RoomForm.js';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path='/' exact>
        <JoinForm />
      </Route>
      <Route path='/create' exact>
        <RoomForm />
      </Route>
    </div>
  );
}

export default App;
