import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
import MainNote from './MainNote'

describe(`<MainNote />`, () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <MainNote />
      </BrowserRouter>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  })
})