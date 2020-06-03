import React from "react";
import AboutApp from "./AboutApp";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter as Router } from 'react-router-dom';



function renderAboutApp() {
  return render(
    <Router>
      <AboutApp />
    </Router>
  )
}

describe("<AboutApp />", () => {

  it('can display group info', async () => {
    const { getByTestId } = renderAboutApp()

    const aboutInfo = getByTestId('about')

    expect(aboutInfo).toBeInTheDocument()
  })

});
