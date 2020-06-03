import React, { useState, useEffect } from 'react';
import './ChatForm.css';
import uniqid from 'uniqid';
import Filter from 'bad-words';


<<<<<<< HEAD
function ChatForm({ socket, setError, roomCode, name, filterOn }) {
  const [ message, setMessage ] = useState('')
  const [ filter, setFilter] = useState(new Filter({ placeHolder: '🤬' }))

  useEffect(()=>{
    if (!filterOn) {
      setFilter(new Filter({ emptyList:true }))
    } else {
      setFilter(new Filter({ placeholder: '🤬' }))
    }
  }, [filterOn])


=======
function ChatForm({ socket, setError, roomCode, name, sid }) {
  const [ message, setMessage ] = useState('');
>>>>>>> 95c8a400091f3171b767752e6c44ae3dfa1fa1eb

  const handleClick = e => {
    e.preventDefault();
    if (message) {
<<<<<<< HEAD

      const cleanMessage = filter.clean(message)

      socket.emit('message', { message: cleanMessage, id: uniqid(), room: roomCode, sender_name: name })
      setMessage('')
      setError('')
=======
      socket.emit('message', {message, sid, id: uniqid(), room: roomCode, sender_name: name});
      setMessage('');
      setError('');
>>>>>>> 95c8a400091f3171b767752e6c44ae3dfa1fa1eb
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
