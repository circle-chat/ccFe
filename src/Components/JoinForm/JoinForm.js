import React, { useState } from 'react';
import './JoinForm.css';
import { Link } from 'react-router-dom';

function JoinForm() {
  const [ nickname, setNickname ] = useState('')
  const [ roomCode, setRoomCode ] = useState('')


    return (
      <section className="JoinForm">
        <form>
          <label htmlFor='name-input'>Name:
            <input
              id='name-input'
              type='text'
              placeholder='Name'
              value={ nickname }
              onChange={(e) => { setNickname(e.target.value) }}
            />
          </label>
          <label htmlFor='code-input'>Room Code:
            <input
              id='code-input'
              type='text'
              placeholder='Room Code'
              value={ roomCode }
              onChange={(e) => { setRoomCode(e.target.value) }}
            />
          </label>
          <Link to='/create'>
            <button>
              Create Room
            </button>
          </Link>
          <Link to='/chat'>
            <button>
              Chat!
            </button>
          </Link>
        </form>
      </section>
    );
}

export default JoinForm;
