import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';


const testStore = createStore(rootReducer);

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={testStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const appName = getByText('The Circle');
  expect(appName).toBeInTheDocument();
});
