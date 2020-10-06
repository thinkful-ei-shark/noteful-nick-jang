import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
import Note from './Note'

describe(`<Note />`, () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Note />
      </BrowserRouter>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  })
})