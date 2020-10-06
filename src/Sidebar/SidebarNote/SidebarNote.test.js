import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
import SidebarNote from './SidebarNote'

describe(`<SidebarNote />`, () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <SidebarNote />
      </BrowserRouter>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  })
})