import React, { useState } from 'react';
import './ChatForm.css';
import { Link } from 'react-router-dom';

function JoinForm() {
  const [ message, setMessage ] = useState('')

    return (
      <section className="ChatForm">
        <form>
          <section className="InputContainer">
            <input
              id='message-input'
              type='text'
              placeholder='Type a message here...'
              value={ message-text }
              onChange={(e) => { setMessage(e.target.value) }}
            />
            <button>
            Send Message
            </button>
          </section>
        </form>
      </section>
    );
}

export default ChatForm;
