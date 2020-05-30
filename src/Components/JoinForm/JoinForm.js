import React, { useState } from 'react';
import './JoinForm.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewCode, addName } from './../../Actions';

function JoinForm({ codes, addNewCode, room, addName }) {
  const [ user, setUser ] = useState('')
  const [ roomCode, setRoomCode ] = useState(room)

  const saveMyCodes = () => {
    addName(user)
    addNewCode(roomCode)
    if ( !codes.includes(roomCode)) {
      window.localStorage.setItem('codes', JSON.stringify( [roomCode, ...codes] ))
    }
  }

  const createOptions = () => {
    return codes.map(code => (<option key={ code } value={ code }/>))
  }

    return (
        <form className="JoinForm">
          <section className='input-container'>
            <label htmlFor='name-input'>Name:
            </label>
            <input
            id='name-input'
            type='text'
            placeholder='Name'
            value={ user }
            onChange={(e) => { setUser(e.target.value) }}
            />
          </section>
          <section className='input-container'>
            <label htmlFor='code-input'>Group Code:
            </label>
            <input
            id='code-input'
            list='codes'
            placeholder='Group Code'
            value={ roomCode }
            onChange={(e) => { setRoomCode(e.target.value) }}
            />
          <datalist id='codes'>
            {createOptions()}
          </datalist>
          </section>
          <section className='button-box'>
            <Link to='/create'>
              <button>
              Create Group
              </button>
            </Link>
            <Link to='/chat'>
              <button
                disabled={ !(user && roomCode)}
                onClick={saveMyCodes}
              >
              Chat!
              </button>
            </Link>
          </section>
        </form>
    );
}

const mapStateToProps = state => ({
  codes: state.codes,
  room: state.roomCode
})

const mapDispatchToProps = dispatch => ({
  addNewCode: code => dispatch(addNewCode(code)),
  addName: code => dispatch(addName(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
