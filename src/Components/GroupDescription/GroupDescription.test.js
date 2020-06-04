import React from "react";
import GroupDescription from "./GroupDescription";
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { addNewCode } from './../../Actions';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './../../Reducers';
import { getGroup } from './../../APICalls.js'



jest.mock('./../../APICalls.js')

const testStore = createStore(rootReducer);

const groupWithRules = {
  "_id": {
  "$oid": "5ed75a2d9fb0ed8dc8265d7b"
  },
  "name": "Gamer For Life",
  "access_code": "5c44ad88",
  "description": "Video game lovers ",
  "rules": "[{\"id\":\"kaz2gzzf\",\"rule\":\"No swearing\"},{\"id\":\"kaz2hg2c\",\"rule\":\"No Sexual reference \"},{\"id\":\"kaz2hls3\",\"rule\":\"Have Fun\"},{\"id\":\"kaz2hxwb\",\"rule\":\"All opinons matter\"},{\"id\":\"kaz2i5fi\",\"rule\":\"All games are fun\"}]",
  "created": {
  "$date": 1591171629226
  }
}


function renderGroupDescription() {
  return render(
    <Router>
      <Provider store={testStore}>
        <GroupDescription />
      </Provider>
    </Router>
  )
}

testStore.dispatch(addNewCode('test-code'))

describe("<GroupDescription />", () => {
  it('can display group info', async () => {
    getGroup.mockResolvedValueOnce(groupWithRules)
    const { getAllByTestId, getByText } = renderGroupDescription()
    const rules = await waitFor(() => getAllByTestId('rule'))
    const name = await waitFor(() => getByText('Welcome to, Gamer For Life'))
    const code = await waitFor(() => getByText('Group Code: 5c44ad88'))
    const description = await waitFor(() => getByText('Video game lovers'))

    expect(rules).toHaveLength(5)
    expect(name).toBeInTheDocument()
    expect(code).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

});
