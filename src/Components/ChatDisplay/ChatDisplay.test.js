import React from "react";
import ChatDisplay from "./ChatDisplay";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import uniqid from 'uniqid';
import Filter from 'bad-words';

const filter = new Filter()

const createMessage = (message) => {
  return { 'message': message, 'sender_name': 'joe', 'id': uniqid() }
}

function renderChatDisplay() {
  return render(
    <ChatDisplay
      userTwo={ 'name string' }
      group={ 'code string' }
      messages={ [ createMessage('Test-Message1'), createMessage('Test-Message2'), createMessage('Test-Message3') ] }
      filter={filter}
      filterOn={true}
    />
  )
}

describe("<ChatDisplay />", () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};

  it('can display a message', () => {
    const { getByText } = renderChatDisplay()

    const message1 = getByText('Test-Message1')
    const message2 = getByText('Test-Message2')
    const message3 = getByText('Test-Message3')

    expect(message1).toBeInTheDocument()
    expect(message2).toBeInTheDocument()
    expect(message3).toBeInTheDocument()
  })

});
