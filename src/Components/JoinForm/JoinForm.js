import React, { useState, useEffect } from 'react';
import './JoinForm.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCircleCode } from './../../Actions/index.js';




function JoinForm({ codes, getMyCode }) {
  const [ nickname, setNickname ] = useState('')
  const [ roomCode, setRoomCode ] = useState('')

  const createOptions = () => {
    console.log(codes);
    return codes.map(code => (<option value={ code }/>))
  }

  const saveMyCodes = () => {
    window.localStorage.setItem('codes', JSON.stringify( codes ))
  }

  const storeMyCodes = () => {
    const codes = JSON.parse(window.localStorage.getItem('codes'))
    if (codes) {
      codes.map(code => getMyCode(code))
    }
  }

  useEffect(() => {
    // storeMyCodes()
  }, [])


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
const mapDispatchToProps = dispatch => ({
  getMyCode: code => dispatch(getCircleCode(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
