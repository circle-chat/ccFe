import React, { useEffect } from 'react';
import './Participant.css';
import LoadingBalls from './../LoadingBalls/LoadingBalls.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Participant({ waiting, userTwo, group }) {

  const displayParticipant = ( message ) => {
    return (
      <section>
          <h3>Circle Code: { group }</h3>
        { message }
        <h3 className='user-two'>{ userTwo }</h3>
      </section>
    )
  }

  const waitingMessage = (
    <section className='waiting-message '>
      <h3>Waiting to Connect</h3>
      <LoadingBalls />
    </section>
  )

  const connectedMessage = <h3 className='in-message'>Connected With:</h3>

  useEffect(() => {
    if (userTwo) {
      let participant = document.querySelector('#Participant')
      participant.classList.add('connected')
    }
  }, [userTwo])

  return (
    <section id='Participant' className='Participant'>
      { !waiting && displayParticipant( connectedMessage ) }
      { waiting && displayParticipant( waitingMessage ) }
      <CopyToClipboard text={`${window.location.origin}/join/${group}`}>
        <button id='icon-button' data-tooltip="Copy Invite Link.">
          <img className='icon' src="assets/clipboard.svg" alt="clipboard" />
        </button>
      </CopyToClipboard>
    </section>
  );
}

export default Participant;
