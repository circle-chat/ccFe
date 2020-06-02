import React, { useState } from 'react';
import './RoomForm.css';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import { connect } from 'react-redux';
import { getCircleCode } from './../../Actions/index.js';
import { postGroup } from './../../APICalls.js'


function RoomForm({getCircleCode}) {
  const [ groupName, setRoomname ] = useState('')
  const [ rules, handleRules ] = useState([])
  const [ potentialRule, setRule ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ error, setError ] = useState('')

  const messagesEndRef = React.createRef()

  const handleBlur = (e) => {
    let error = e.target.placeholder
    if (!e.target.value) {
      setError(error)
    } else {
      setError('')
    }
  }

  const storeCode = async () => {
    try {
      const data = await postGroup( groupName, description, rules )
      getCircleCode(data.access_code)
    } catch (err) {
      console.log(err);
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const addRule = e => {
    e.preventDefault()
    if (potentialRule) {
      const formattedRule = {id:uniqid(), rule: potentialRule}
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
        <div className='rule' key={ rule.id  }>
          <button type='button' id={ rule.id } onClick={ (e)=> { removeRule(e.target.id) } }>X</button>
          <h4>{ rule.rule }</h4>
        </div>
      )
    })
  }



    return (
      <form onSubmit={ (e) => {e.preventDefault()} } className="RoomForm">
        {error && <p className='error'>*{error} is a required field</p>}
        <section className='input-container'>
          <label htmlFor='room-input'>*Group Name:
          </label>
          <input
          id='room-input'
          type='text'
          placeholder='Group Name'
          value={ groupName }
          onBlur={(e)=> { handleBlur(e) }}
          onChange={(e) => { setRoomname(e.target.value) }}
          />
        </section>
        <section className='input-container'>
          <label htmlFor='description-input'>Description:
          </label>
          <textarea
          id='description-input'
          placeholder='This Group is For...'
          rows="2"
          cols="50"
          value={ description }
          onChange={(e) => { setDescription(e.target.value) }}
          />
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
            <button id='cancel' type='button'>
            Cancel
            </button>
          </Link>
          <Link to='/'>
            <button
              disabled={ !groupName }
              type='button'
              onClick={ storeCode }
            >
            Create Group
            </button>
          </Link>
        </section>
      </form>
    );
}

const mapDispatchToProps = dispatch => ({
  getCircleCode: code => dispatch(getCircleCode(code))
})

export default connect(null, mapDispatchToProps)(RoomForm);
