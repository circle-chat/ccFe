import React from "react";
import Participant from "./Participant";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { MemoryRouter as Router } from 'react-router-dom';

function renderParticipant() {
  return render(
    <Participant
      userTwo={ 'Test-User-Two' }
      group={ 'Test-Group' }
    />
  )
}

describe("<Participant />", () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};

  it('can display room information', () => {
    const { getByText, debug } = renderParticipant()

    const user2 = getByText('Test-User-Two')
    const groupName = getByText('Circle Code: Test-Group')
    debug()

    expect(user2).toBeInTheDocument
    expect(groupName).toBeInTheDocument
  })

});
