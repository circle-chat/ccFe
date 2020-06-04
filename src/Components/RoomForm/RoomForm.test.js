import React from "react";
import RoomForm from "./RoomForm";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './../../reducers';
import { MemoryRouter as Router } from 'react-router-dom';
import { postGroup } from './../../APICalls.js'
import uniqid from 'uniqid';



jest.mock('./../../APICalls.js')
jest.mock('uniqid')

const testStore = createStore(rootReducer);




function renderRoomForm() {
  return render(
    <Router>
      <Provider store={testStore}>
        <RoomForm  />
      </Provider>
    </Router>
  )
}

describe("<RoomForm />", () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  postGroup.mockResolvedValue({ access_code: '1234' })
  uniqid.mockReturnValue('12345id')

  it('Renders the form', () => {
    const { getByText, getByPlaceholderText } = renderRoomForm()

    const nameInput = getByPlaceholderText('Group Name')
    const ruleInput = getByPlaceholderText('Rule')
    const cancelButton = getByText('Cancel')
    const createButton = getByText('Create Group')
    const plusButton = getByText('+')

    expect(nameInput).toBeInTheDocument()
    expect(ruleInput).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()
    expect(plusButton).toBeInTheDocument()
  })

  it('Can add a rule', () => {
    const { getByText, getByPlaceholderText } = renderRoomForm()

    const nameInput = getByPlaceholderText('Group Name')
    const ruleInput = getByPlaceholderText('Rule')
    const plusButton = getByText('+')

    fireEvent.change(nameInput, { target: { value: 'Test-Name' } })
    fireEvent.change(ruleInput, { target: { value: 'Test-Rule' } })

    fireEvent.click(plusButton)

    const expected = getByText('Test-Rule')
    expect(expected).toBeInTheDocument()
  })

  it('chat disabled if form is not filled out', () => {
    const { getByText, getByPlaceholderText } = renderRoomForm()

    const createButton = getByText('Create Group')
    const nameInput = getByPlaceholderText('Group Name')
    const ruleInput = getByPlaceholderText('Rule')
    const descriptionInput = getByPlaceholderText('This Group is For...')
    const plusButton = getByText('+')


    expect(createButton.disabled).toBe(true)


    fireEvent.change(nameInput, { target: { value: 'Test-Name' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test-Description' } })
    fireEvent.change(ruleInput, { target: { value: 'Test-Rule' } })

    fireEvent.click(plusButton)
    fireEvent.click(createButton)
    expect(postGroup).toHaveBeenCalled()
    expect(postGroup).toHaveBeenCalledWith( 'Test-Name', 'Test-Description', [{ "id": "12345id", "rule": "Test-Rule" }] )
  })

});
