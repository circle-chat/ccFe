import React, { useState, useEffect } from 'react';
import './ChatForm.css';
import uniqid from 'uniqid';
import Filter from 'bad-words';

function ChatForm({ socket, setError, roomCode, name, sid, filter }) {
  const [ message, setMessage ] = useState('');


  const handleClick = e => {
    e.preventDefault();
    if (message) {

      const isDirtyMessage = filter.isProfane(message)

      socket.emit('message', { message, id: uniqid(), room: roomCode, sender_name: name, sid: sid})
      setMessage('')
      setError('')
    } else {
      setError('message must contain text');
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
