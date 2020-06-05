import React from "react";
import Participant from "./Participant";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';


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
    const { getByText } = renderParticipant()

    const user2 = getByText('Test-User-Two')
    const groupName = getByText('Circle Code: Test-Group')

    expect(user2).toBeInTheDocument()
    expect(groupName).toBeInTheDocument()
  })

});
