import React, { useState } from 'react';
import './ChatForm.css';
import { Link } from 'react-router-dom';

function ChatForm({ socket, setError }) {
  const [ message, setMessage ] = useState('')

  const handleClick = e => {
    e.preventDefault()
    if (message) {
      socket.emit('message', message)
      setMessage('')
      setError('')
    } else {
      setError('message must contain text')
    }
  }


    return (
      <section className="ChatForm">
        <form>
          <section className="InputContainer">
            <input
              id='message-input'
              type='text'
              placeholder='Type a message here...'
              value={ message }
              onChange={(e) => { setMessage(e.target.value) }}
            />
          <button onClick={ (e) => handleClick(e) }>
            Send Message
            </button>
          </section>
        </form>
      </section>
    );
}

export default ChatForm;
