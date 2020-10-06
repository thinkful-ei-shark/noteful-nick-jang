import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
import SidebarMain from './SidebarMain'

describe(`<SidebarMain />`, () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <SidebarMain />
      </BrowserRouter>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  })
})