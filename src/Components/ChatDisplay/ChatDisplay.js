import React from 'react';
import './ChatDisplay.css';
import Participant from './../Participant/Participant.js';

const ChatDisplay = React.forwardRef(({ messages, group, userTwo, sid, setFilterStatus, filter, filterOn }, ref) => {
  const displayMessages = () => {
    return messages.map(message => {
      const isMe = message.sid !== sid ? 'user-one' : 'user-two'
      const cleanMessage = filter.clean(message.message)
      return (
        <li className={`message ${isMe}`} key={message.id}>
          <p className='sender'>
            {message.sender_name}
          </p>
          <p className='text'>
            {cleanMessage}
          </p>
        </li>
      )
    })
  }

  return (
    <section className="ChatDisplay">
      { !userTwo && <Participant group={ group } waiting={ true } /> }
      { userTwo && <Participant group={ group } userTwo={ userTwo.name } waiting={ false } /> }
      { userTwo &&
        <section id='profanity-check'>
          <label htmlFor='profanity-box' >
            Profanity Filter:
          </label>
          <input type='checkbox' checked={filterOn} onChange={()=>{setFilterStatus(!filterOn)}} id="profanity-box" />
        </section>
      }
      { userTwo && <ul> {displayMessages()} </ul> }
      <div className='empty-space' ref={ref} />
    </section>
  );
})

export default ChatDisplay;
