import React, { useState, useEffect } from 'react';
import './JoinForm.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function JoinForm({ codes }) {
  const [ nickname, setNickname ] = useState('')
  const [ roomCode, setRoomCode ] = useState('')

  const saveMyCodes = () => {
    window.localStorage.setItem('codes', JSON.stringify( codes ))
  }

  const createOptions = () => {
    console.log(codes);
    return codes.map(code => (<option value={ code }/>))
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
            value={ nickname }
            onChange={(e) => { setNickname(e.target.value) }}
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
                disabled={ !(nickname && roomCode)}
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
})

export default connect(mapStateToProps, null)(JoinForm);
