import React, { useEffect, useState } from 'react';
import './GroupDescription.css';
import { getGroup } from './../../APICalls.js'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GroupDescription = ({groupCode}) => {
  const [group, setGroup] = useState({
    name: '',
    access_code: '',
    description: '',
    rules: "[]"
  })
  const [url, setUrl] = useState('')

  const createRules = () => {
    const rules = JSON.parse(group.rules)
    return rules.map(rule => {
      return (
        <li data-testid='rule' key={rule.id} >
          {rule.rule}
        </li>
      )
    })
  }

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const group = await getGroup(groupCode)
        if (!group) {
          throw new Error('group does not exist')
        }
        if (!JSON.parse(group.rules).length) {
          setUrl('/chat')
          return
        }
        setGroup(group)
      } catch (err) {
        console.log(err);
        setUrl('/')
        alert(err.message)
      }

    }
    fetchGroup()
  },[])

  return (
    <section className='GroupDescription'>
      {url && <Redirect to={url}/>}
      <h2 className='group-welcome'>Welcome to, {group.name}</h2>
      <section className='group-code-section'>
        <h3>Group Code: {group.access_code}</h3>
        <CopyToClipboard text={`${window.location.origin}/join/${groupCode}`}>
          <button id='icon-button' data-tooltip="Click to Copy Invite Link.">
            Copy Invite Link!
          </button>
        </CopyToClipboard>
      </section>
      <section className='group-description-section'>
        <h4 >This group is for:</h4>
        <h4>{group.description}</h4>
      </section>
      <section className='group-rules-section'>
        <h4>Rules:</h4>
        <ul>
          {createRules()}
        </ul>
      </section>
      <Link to='/chat'>
        <button>Join Room</button>
      </Link>
    </section>
  )
}

const mapStateToProps = (state) => ({
  groupCode: state.groupCode
})

export default connect(mapStateToProps, null)(GroupDescription);
