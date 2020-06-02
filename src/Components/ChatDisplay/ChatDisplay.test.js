import React from "react";
import ChatDisplay from "./ChatDisplay";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { MemoryRouter as Router } from 'react-router-dom';
import { postGroup } from './../../APICalls.js'
import uniqid from 'uniqid';



jest.mock('./../../APICalls.js')
jest.mock('uniqid')

const testStore = createStore(rootReducer);




function renderChatDisplay() {
  return render(
    <Router>
      <Provider store={testStore}>
        <ChatDisplay  />
      </Provider>
    </Router>
  )
}

describe("<ChatDisplay />", () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  postGroup.mockResolvedValue({ access_code: '1234' })

  it('chat disabled if form is not filled out', () => {
    const { getByText, debug, getByPlaceholderText } = renderChatDisplay()

    uniqid.mockReturnValue('12345id')

    const sendButton = getByText('Send Message')
    const messageInput = getByPlaceholderText('Type a message here...')

    expect(createButton.disabled).toBe(true)

    const nameInput = getByPlaceholderText('Name')

    fireEvent.change(nameInput, { target: { value: 'Test-Name' } })
    fireEvent.change(ruleInput, { target: { value: 'Test-Rule' } })

    fireEvent.click(plusButton)
    fireEvent.click(createButton)
    expect(postGroup).toHaveBeenCalled()
    expect(postGroup).toHaveBeenCalledWith( 'Test-Name', [{ "id": "12345id", "rule": "Test-Rule" }], '' )
    debug()
})

});
