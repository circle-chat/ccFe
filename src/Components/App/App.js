import React from 'react';
import './App.css';
import JoinForm from '../JoinForm/JoinForm.js';
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route path='/' exact>
        <JoinForm />
      </Route>

    </div>
  );
}

export default App;
