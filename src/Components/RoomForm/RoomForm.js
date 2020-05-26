import React, { useState, useEffect } from 'react';
import './RoomForm.css';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

function RoomForm() {
  const [ roomname, setRoomname ] = useState('')
  const [ rules, handleRules ] = useState([])
  const [ potentialRule, setRule ] = useState('')
  const [ roomID, setroomID ] = useState(uniqid())

  const messagesEndRef = React.createRef()

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const addRule = e => {
    e.preventDefault()
    if (potentialRule) {
      const formattedRule = {id: uniqid(), rule: potentialRule}
      handleRules([...rules, formattedRule])
      setRule('')
      scrollToBottom()
    }
  }

  const removeRule = ruleID => {
    handleRules(rules.filter(rule => rule.id !== ruleID))
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      addRule(e)
    }
  }

  const createRules = () => {
    return rules.map(rule => {
      return (
        <div className='rule' key={ rule.id }>
          <button type='button' id={ rule.id } onClick={ (e)=> { removeRule(e.target.id) } }>X</button>
          <h4>{ rule.rule }</h4>
        </div>
      )
    })
  }



    return (
      <form onSubmit={ (e) => {e.preventDefault()} } className="RoomForm">
        <section className='input-container'>
          <label htmlFor='room-input'>Group:
          </label>
          <input
          id='room-input'
          type='text'
          placeholder='Name'
          value={ roomname }
          onChange={(e) => { setRoomname(e.target.value) }}
          />
        </section>
        <section className='input-container'>
          <label>Group Code:</label> <h2>{ roomID }</h2>
        </section>
        <h3 className='rules-head'>Group Rules</h3>
        <section className='rules-container'>
          {createRules()}
          <div className='empty-space' ref={messagesEndRef} />
        </section>
        <section className='rules-input'>
          <input id='rule-input'
          type='text'
          placeholder='Rule'
          value={ potentialRule }
          onChange={ (e) => { setRule(e.target.value) } }
          onKeyUp={ (e) => { handleEnter(e) } }
          />
        <button type='button' onClick={(e) => { addRule(e) }}>+</button>
        </section>
        <section className='button-box'>
          <Link to='/'>
          <button className='cancel' type='button'>
          Cancel
          </button>
          </Link>
          <Link to='/'>
          <button disabled={ !roomname } type='button'>
          Create Group
          </button>
          </Link>
        </section>
      </form>
    );
}

export default RoomForm;
