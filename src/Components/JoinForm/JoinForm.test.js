import React from "react";
import JoinForm from "./JoinForm";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './../../Reducers';
import { MemoryRouter as Router } from 'react-router-dom';


const testStore = createStore(rootReducer);




function renderJoinForm() {
  return render(
    <Router>
      <Provider store={testStore}>
        <JoinForm  />
      </Provider>
    </Router>
  )
}

describe("<JoinForm />", () => {
  it('Renders the from', () => {
    const { getByText, getByPlaceholderText } = renderJoinForm()

    const nameInput = getByPlaceholderText('Name')
    const codeInput = getByPlaceholderText('Group Code')
    const chatButton = getByText('Chat!')
    const createButton = getByText('Create Group')

    expect(nameInput).toBeInTheDocument()
    expect(codeInput).toBeInTheDocument()
    expect(chatButton).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()
  })

  it('Renders the from', () => {
    const { getByText, getByPlaceholderText } = renderJoinForm()

    const nameInput = getByPlaceholderText('Name')
    const codeInput = getByPlaceholderText('Group Code')
    const chatButton = getByText('Chat!')


    fireEvent.change(nameInput, { target: { value: 'Test-Name' } })
    fireEvent.change(codeInput, { target: { value: 'Test-Code' } })

    expect(chatButton.disabled).toBe(false)

    fireEvent.click(chatButton)

    const expected = ['Test-Code']
    expect(JSON.parse(window.localStorage.codes)).toEqual(
      expect.arrayContaining(expected),
    );

  })

  it('chat disabled if form is not filled out', () => {
    const { getByText } = renderJoinForm()


    const chatButton = getByText('Chat!')


    expect(chatButton.disabled).toBe(true)

  })

});
