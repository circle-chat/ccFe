import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import JoinForm from '../JoinForm/JoinForm.js';
import AboutApp from '../AboutApp/AboutApp.js';
import RoomForm from '../RoomForm/RoomForm.js';
import GroupDescription from '../GroupDescription/GroupDescription.js';
import ChatContainer from '../ChatContainer/ChatContainer.js';
import { Route, useHistory } from 'react-router-dom';
import {ReactComponent as ChatLogo} from './assets/message.svg';
import { grabLocalCodes } from './../../Actions/index.js';
import { connect } from 'react-redux';




function App({ grabLocalCodes }) {
  const [location, setLocation] = useState('main-page')
  const history = useHistory()




  useLayoutEffect(() => {
    const storeMyCodes = () => {
      const codes = JSON.parse(window.localStorage.getItem('codes'))
      if (codes) {
        grabLocalCodes( codes )
      }
    }

    storeMyCodes()
    let IsJoin = window.location.pathname === '/'
    let IsAlsoJoin = window.location.pathname.includes('join')
    let landing = IsJoin || IsAlsoJoin ?
    'main-page' : 'not-main'
    setLocation(landing)
  },[])

  history.listen((location) => {
    let landing = window.location.pathname === '/' ?
    'main-page' : 'not-main'
    setLocation(landing)
  })

  return (
    <main className={location + ' App'}>
      <header>
        <div className='logo-box'>
          <ChatLogo />
          <div className='dash-circle'></div>
        </div>
        <h1>The Circle</h1>
      </header>
      <Route path='/' exact>
        <JoinForm />
      </Route>
      <Route
        path="/join/:groupCode" exact
        component={({ match }) => {
            const { params } = match;
            return (<JoinForm
              groupCode = {params.groupCode}
            />)
          }
        }
      />
      <Route path='/create'>
        <RoomForm />
      </Route>
      <Route path='/about'>
        <AboutApp />
      </Route>
      <Route path='/group'>
        <GroupDescription />
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
