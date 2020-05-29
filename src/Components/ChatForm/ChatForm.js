import React, { useState } from 'react';
import './ChatForm.css';


function ChatForm({ socket, setError, roomCode }) {
  const [ message, setMessage ] = useState('')

  const handleClick = e => {
    e.preventDefault()
    if (message) {
      socket.emit('message', {message, room:roomCode})
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
