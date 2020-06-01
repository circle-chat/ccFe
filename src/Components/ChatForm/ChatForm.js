import React, { useState } from 'react';
import './ChatForm.css';
import uniqid from 'uniqid';


function ChatForm({ socket, setError, roomCode, name, scrollToBottom }) {
  const [ message, setMessage ] = useState('')

  const handleClick = e => {
    e.preventDefault()
    if (message) {
      socket.emit('message', {message, id: uniqid(), room: roomCode, sender_name: name})
      setMessage('')
      setError('')
      scrollToBottom()
    } else {
      setError('message must contain text')
    }
  }


    return (
      <section className="ChatForm">
        <form>
          <section className="InputContainer chat-input">
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
