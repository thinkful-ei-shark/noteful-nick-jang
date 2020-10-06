import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
import Header from './Header'

describe(`<Header />`, () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  })
})