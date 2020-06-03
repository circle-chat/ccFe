import React from "react";
import ChatForm from "./ChatForm";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocketMock from 'socket.io-mock';
<<<<<<< HEAD
import { addNewCode, addRoomCode } from './../../Actions';
import uniqid from 'uniqid';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';


const testStore = createStore(rootReducer);
=======
import uniqid from 'uniqid';

jest.mock('uniqid')
>>>>>>> 95c8a400091f3171b767752e6c44ae3dfa1fa1eb

jest.mock('uniqid')

let socket = new SocketMock();

const mockSetError = jest.fn()

function renderChatForm(filterStatus = true) {
  return render(
        <ChatForm
          socket={socket}
          roomCode={'test-code'}
          setError={mockSetError}
<<<<<<< HEAD
          name={'jennyfromtheblock'}
          filterOn={filterStatus}
=======
          name={'alan'}
>>>>>>> 95c8a400091f3171b767752e6c44ae3dfa1fa1eb
        />
  )
}

describe("<ChatForm />", () => {
  socket.emit = jest.fn()
  uniqid.mockReturnValue('12345id')
  it("User can send a chat", () => {
    const { getByText, getByPlaceholderText } = renderChatForm()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    expect(socket.emit).toHaveBeenCalled()
<<<<<<< HEAD
    expect(socket.emit).toHaveBeenCalledWith('message', {message:'Test', room:'test-code', sender_name:'jennyfromtheblock', id: '12345id'})

  });

  it.only("User is censored when profanity is used", () => {
    const { getByText, getByPlaceholderText } = renderChatForm()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.change(messageInput, { target: { value: 'You are a shit-stained fuck-ass' } })
    fireEvent.click(messageSend)

    expect(socket.emit).toHaveBeenCalled()
    expect(socket.emit).toHaveBeenCalledWith('message', {message:'You are a 🤬🤬🤬🤬-stained 🤬🤬🤬🤬-🤬🤬🤬', room:'test-code', sender_name:'jennyfromtheblock', id: '12345id'})

  });

  it("User is not censored when profanity filter is off", () => {
    const { getByText, getByPlaceholderText } = renderChatForm(false)

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.change(messageInput, { target: { value: 'You are a shit-stained fuck-ass' } })
    fireEvent.click(messageSend)

    expect(socket.emit).toHaveBeenCalled()
    expect(socket.emit).toHaveBeenCalledWith('message', {message:'You are a shit-stained fuck-ass', room:'test-code', sender_name:'jennyfromtheblock', id: '12345id'})

=======
    expect(socket.emit).toHaveBeenCalledWith('message', {message:'Test', sender_name: "alan", room:'test-code', "id": "12345id"})
>>>>>>> 95c8a400091f3171b767752e6c44ae3dfa1fa1eb
  });

  it("Error is set on blocked input", () => {
    const { getByText } = renderChatForm()

    const messageSend = getByText('Send Message')

    fireEvent.click(messageSend)

    expect(mockSetError).toHaveBeenCalled()
    expect(mockSetError).toHaveBeenCalledWith('message must contain text')
  });

  it("Error is cleared on valid input", () => {
    const { getByText, getByPlaceholderText } = renderChatForm()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.click(messageSend)

    expect(mockSetError).toHaveBeenCalled()

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    expect(mockSetError).toHaveBeenCalledWith('')
  });

});
